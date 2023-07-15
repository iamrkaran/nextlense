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
import { useDispatch } from "react-redux";
import { fetchPosts } from "@/reducers/postSlice";
import { type } from 'os';
import Comment from './Comment';
import ViewAllComments from './ViewAllComments';
import Follow from './Follow';
import ModelComponent from './ModelComponent';

type Post = {
    _id: string;
    user: string;
    caption: string;
    image: string;
    createdDate: Date;
    likes: string[];
    comments: { user: string; text: string; createdDate: Date }[];
};

type PostComponentProps = {
    post: Post;
    session: any;
    refreshData: () => void;
};


const PostComponent = ({ post, session, refreshData }: PostComponentProps) => {
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    useEffect(() => {
        setLiked(post.likes.includes(session?.user?.id));
    }, [post, session]);

    const handleLike = async () => {
        try {
            const updatedFollowingStatus = !liked;

            setLiked(updatedFollowingStatus);

            const response = await axios.post('/posts/like', {
                postId: post._id,
                userId: session?.user?.id
            });

            if (response.status === 200) {
                setLiked(!updatedFollowingStatus);
                refreshData();
            }
        } catch (error) {
            console.error(error);
            setLiked(!liked);
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

    const refresh = () => {
        try {
            dispatch(fetchPosts() as any);
        } catch (error) {
            console.error(error);
        }
    }


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

                    {session?.user?.id !== postUser?._id && (
                        <Follow followerId={session?.user?.id} followingId={postUser?._id} />
                    )}

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
            <div className={`flex items-center ${isModalOpen ? '' : 'space-x-4'}`}>

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

                    <FiMessageCircle className="text-gray-500" size={20} onClick={handleToggleModal} />

                    {isModalOpen && (
                        <ModelComponent
                            onClose={handleToggleModal}
                            postId={post._id}
                            session={session}
                            refresh={refresh}
                        >
                            {post?.comments?.length > 0 &&
                                post?.comments?.map((comment, index) => (
                                    <Comment
                                        key={index}
                                        postUser={postUser}
                                        postId={post?._id}
                                        comment={comment}
                                        session={session}
                                        refresh={refresh}
                                    />
                                ))}
                        </ModelComponent>
                    )}
                    <FiShare className="text-gray-500" size={20} />
                </div>
                <Bookmark
                    postId={post?._id}
                    userId={session?.user?.id}

                    refresh={refresh}
                />
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

                <ViewAllComments postId={post?._id} postUser={postUser} refresh={refresh}/>


            </div>

            <div className='py-2 flex justify-start '>
                <AddComment
                    postId={post._id}
                    session={session}
                    refresh={refresh}
                />
            </div>
        </div >

    );
}


export default PostComponent;
