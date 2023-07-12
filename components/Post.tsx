"use react";
import Image from 'next/image';
import { FiHeart, FiMessageCircle, FiShare } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import axios from '@/config/axiosInstance';
import AddComment from './AddComment';
import PostDropdownMenu from './DropdownMenu';
import { menuItems } from '@/constants/postMenuItems';
import Bookmark from './Bookmark';


const PostComponent = ({ post, session }: { post: any, session: any }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(post.likes.includes(session?.user?.id));
    }, [post, session]);

    const handleLike = async () => {
        try {
            const response = await axios.post('/posts/like', {
                postId: post._id,
                userId: session?.user?.id
            });

            if (response.status === 200) {
                setLiked(!liked);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [postUser, setPostUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${post?.user}`);
                setPostUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        if (post?.user) {
            fetchUser();
        }
    }, [post?.user]);
 

    return (  
        <div className="max-w-md mx-auto bg-white rounded-md shadow-lg mb-4">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <Image
                        src={postUser?.picture || "/next.svg"}
                        alt="Logo"
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                    <h3 className="text-sm font-semibold">{postUser?.username}</h3>

                </div>
                <PostDropdownMenu items={menuItems} />

            </div>
            <div className="relative">
                <Image
                    src={post?.image}
                    alt="Post Image"
                    layout="responsive"
                    width={500}
                    height={300}
                    className="rounded-t-md w-full h-auto"
                />

            </div>

            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">

                    <div className="flex items-center">
                        {liked ? (
                            <AiFillHeart
                                className="text-red-500"
                                size={20}
                                onClick={handleLike}
                            />
                        ) : (
                            <FiHeart
                                className="text-gray-500"
                                size={20}
                                onClick={handleLike}
                            />
                        )}

                    </div>


                    <FiMessageCircle className="text-gray-500" size={20} />
                    <FiShare className="text-gray-500" size={20} />
                </div>
                {/* <FiBookmark className="text-gray-500" size={20} /> */}
                <Bookmark postId={post?._id} userId={session?.user?.id} />
            </div>
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">
                    {post?.likes?.length > 0 && (
                        <h3 className="text-sm font-semibold">{post?.likes?.length} likes</h3>
                    )}
                </div>
            </div>
            <div className="px-4 py-2 flex justify-start">

                <h3 className="text-sm font-semibold">{postUser?.username}</h3>

                <h3 className="text-sm font-semibold px-2">
                    {post?.caption}
                </h3>
            </div>
            <div className="px-4 py-2 flex justify-start">
                <h3 className="text-sm font-semibold ">
                    {post?.comments?.length > 0 && (
                        <h3 className="text-sm font-semibold">
                            View all {post?.comments?.length} comments</h3>
                    )}
                </h3>
            </div>

            <div className='py-2 flex justify-start '>
                <AddComment postId={post._id} session={session} />
            </div>
        </div>
    );
};

export default PostComponent;
