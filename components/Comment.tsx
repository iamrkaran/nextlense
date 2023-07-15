import React, { useEffect, useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import AddComment from './AddComment';
import axios from '@/config/axiosInstance';
import fetchUsernameById from '@/utils/fetchUsernameById';

type CommentProps = {
    postId: string;
    userId: string;
    session: any;
    refresh: () => void;
};

const Comment: React.FC<CommentProps> = ({
    postId,
    userId,
    refresh,
    session
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [comments, setComments] = useState<any>([]);
    const [username, setUsername] = useState<string>('');

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/comments?postId=${postId}`);
                setComments(response.data.comments.comments);
                refresh();
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
            <button
                onClick={handleToggleModal}
                className="flex items-center text-gray-500"
            >
                <FiMessageCircle className="mr-2" size={20} />
                <span>Comments</span>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl mb-4">Comments</h2>

                        {comments.length > 0 ? (
                            comments.map((comment: any) => (
                                <div key={comment.id} className="mb-2">
                                    <p className="text-gray-600">{comment.text}</p>
                                    <p className="text-sm text-gray-500">
                                        Commented by <span>{username}</span> on{' '}
                                        {new Date(comment.createdDate).toLocaleString()}
                                    </p>

                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                        <AddComment
                            postId={postId}
                            session={session}
                            refresh={refresh}
                        />

                        <button
                            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                            onClick={handleToggleModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
