import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from '@/config/axiosInstance';
import fetchUserDataById from '@/utils/fetchUserDataById';

type Comment = {
    _id: string;
    text: string;
    user: string;
    createdDate: Date;
};

type UserData = {
    username: string;
    picture: string;
};

const ViewAllComments = ({ postId, refresh }: any) => {
    const [showAllComments, setShowAllComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [userDatas, setUserDatas] = useState<UserData[]>([]);

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
                const fetchedComments: Comment[] = response.data.comments.comments;
                setComments(fetchedComments);

                const userIds = fetchedComments.map((comment) => comment.user);
                const fetchedUserDatas = await Promise.all(userIds.map(fetchUserDataById));
                setUserDatas(fetchedUserDatas as UserData[]); // Specify the type explicitly

            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        fetchComments();
    }, [postId, refresh]);

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
                    {comments.map((comment, index) => {
                        const userData = userDatas[index];
                        return (
                            <div className="flex items-start space-x-2" key={comment._id}>
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src={userData?.picture || '/logo.svg'}
                                        alt="User Avatar"
                                        width={36}
                                        height={36}
                                        className="rounded-full"
                                    />

                                    <div>
                                        <h3 className="text-sm font-semibold pr-2">{userData?.username}</h3>
                                        <p className="text-xs text-gray-400">
                                            {comment.createdDate && getTimeAgo(comment.createdDate.toString())}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="ml-4 px-2 text-left text-sm text-gray-900 break-words">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ViewAllComments;
