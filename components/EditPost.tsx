import { useState } from 'react';
import axios from '@/config/axiosInstance';
import { toast } from 'react-toastify';

type Post = {
    _id: string;
    user: string;
    caption: string;
    image: string;
    createdDate: Date;
    likes: string[];
    comments: { user: string; text: string; createdDate: Date }[];
};

type EditPostProps = {
    post: Post;
    postId: string;
    session: any;
    refresh: () => void;
};

const EditPost = ({ post, postId, session, refresh }: EditPostProps) => {
    const [caption, setCaption] = useState(post.caption);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCaptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCaption(event.target.value);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `/posts/update`,
                {
                    postId,
                    userId: session?.user?.id,
                    caption,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.user?.authToken}`,
                    },
                }
            );
            toast.success('Post updated successfully', {
                position: toast.POSITION.TOP_CENTER,
            });
            console.log('Post updated:', response.data);
            refresh();
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            toast.error('Error updating post', {
                position: toast.POSITION.TOP_CENTER,
            });
            console.error('Error updating post:', error);
        }
    };

    return (
        <>

            <button
                className={`block px-4 py-2 border-b border-gray-300 text-sm text-center  w-full text-blue-500 hover:bg-gray-100`}
                onClick={() => setIsModalOpen(true)}>
                Edit
            </button>


            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
                        <textarea
                            className="border border-gray-300 rounded-md p-2 w-full mb-4 bg-gray-900 text-white font-bold text-md"
                            rows={4}
                            placeholder="Enter caption"
                            value={caption}
                            onChange={handleCaptionChange}
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 mr-2"
                                onClick={() => setIsModalOpen(false)} // Close the modal
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-md bg-blue-500 text-white"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditPost;
