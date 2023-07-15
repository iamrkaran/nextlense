import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from '@/config/axiosInstance';
import fetchUsernameById from '@/utils/fetchUsernameById';

type Comment = {
    _id: string;
    text: string;
    user: string;
    createdDate: Date;
    
};

const ViewAllComments = ({ postId, postUser }: any) => {
    const [showAllComments, setShowAllComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [username, setUsername] = useState('');



    const handleToggleComments = () => {
        setShowAllComments(!showAllComments);
    };

    const getTimeAgo = (date: string): string => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);

        if (minutes < 60) {
            return `${minutes}m ago`;
        } else if (minutes < 1440) {
            return `${Math.floor(minutes / 60)}h ago`;
        } else {
            return `${Math.floor(minutes / 1440)}d ago`;
        }
    };


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/comments?postId=${postId}`);
                setComments(response.data.comments.comments);

                if (response.data.comments.comments.length > 0) {
                    const fetchedUsername = await fetchUsernameById(response.data.comments.comments[0].user);
                    setUsername(fetchedUsername);
                }

            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    return (
        <div>
            <h3 className="text-sm font-semibold">
                {comments.length > 0 && (
                    <span
                        className="text-sm font-semibold cursor-pointer text-blue-500"
                        onClick={handleToggleComments}
                    >
                        View all {comments.length} comments
                    </span>
                )}
            </h3>
            {showAllComments && (
                <div className="mt-2 space-y-2">
                    {comments.map((comment) => (
                        <div className="flex items-center space-x-2" key={comment._id}>
                            <div className="flex items-center space-x-2">
                                <Image
                                    src={postUser?.picture || '/next.svg'}
                                    alt="User Avatar"
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                />
                                <h3 className="text-sm font-semibold">{username}</h3>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    {comment.text}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {comment.createdDate instanceof Date && getTimeAgo(comment.createdDate.toISOString())}
                                </p>


                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}


export default ViewAllComments;
