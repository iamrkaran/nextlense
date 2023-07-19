import axios from "@/config/axiosInstance";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
    FiHeart,
    FiMessageCircle,
    FiShare,
    FiMoreHorizontal,
} from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import AddComment from "./AddComment";
import DropdownMenu from "./DropdownMenu";
import Bookmark from "./Bookmark";
import { useDispatch } from "react-redux";
import { fetchPosts } from "@/reducers/postSlice";
import ModelComponent from "./ModelComponent";
import { menuItems } from "@/constants/postMenuItems";
import { updatedMenuItems } from "@/constants/loggedMenuItems";
import Follow from "./Follow";
import ViewAllComments from "./ViewAllComments";
import Comment from "./Comment";
import EditPost from "./EditPost";
import Link from "next/link";
import SharePost from "./SharePost";

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

type NotificationData = {
    type: 'like' | 'comment';
    postId: string;
    sender: string;
    timestamp: Date;
};

const PostComponent = ({ post, session, refreshData }: PostComponentProps) => {
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModelOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isLikeVisible, setIsLikeVisible] = useState(true);
    const [isCommentVisible, setIsCommentVisible] = useState(true);

    const [notificationData, setNotificationData] = useState<NotificationData>({
        type: 'like',
        postId: post._id,
        sender: session?.user?.id ?? '',
        timestamp: new Date(),
    });


    const handleToggleModal = () => {
        setIsModelOpen(!isModalOpen);
    }


    useEffect(() => {
        setLiked(post.likes.includes(session?.user?.id));
    }, [post, session]);

    const handleLike = async () => {
        try {
            const updatedFollowingStatus = !liked;
            setLiked(updatedFollowingStatus);

            const response = await axios.post("/posts/like", {
                postId: post._id,
                userId: session?.user?.id,
            });


            if (response.status === 200) {
                setLiked(!updatedFollowingStatus);
                refreshData();
                sendNotification();
            }
        } catch (error) {
            console.error(error);
            setLiked(!liked);
        }
    };

    const sendNotification = async () => {
        try {
            const notificationResponse = await axios.post("/notifications", {
                ...notificationData,
                type: 'like',
                sender: session?.user?.id,
                timestamp: new Date(),
            });
            if (notificationResponse.status === 200) {
                console.log('Notification sent');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [postUser, setPostUser] = useState<any>(null);
    
    const fetchUser = useMemo(
        () => async (userId: string) => {
          try {
            const response = await axios.get(`/users/${userId}`);
            return response.data;
          } catch (error) {
            console.error('Failed to fetch user:', error);
            return null;
          }
        },
        []
      );
    
      useEffect(() => {
        // Fetch the user data when the post.user value is available or changed
        if (post?.user) {
          fetchUser(post.user).then((userData) => setPostUser(userData));
        }
      }, [post?.user, fetchUser]);
    

    const refresh = () => {
        try {
            dispatch(fetchPosts() as any);
        } catch (error) {
            console.error(error);
        }
    };

    const hideLikeCount = () => {
        setIsLikeVisible((prevIsLikeVisible) => !prevIsLikeVisible);
        console.log("Toggle like count visibility");
        refresh();
    };

    const turnOffComments = () => {
        setIsCommentVisible((prevIsCommentVisible) => !prevIsCommentVisible);
        console.log("Toggle comments visibility");
        refresh();
    };



    return (
        <div className="max-w-md mx-auto bg-white text-gray-900 rounded-md shadow-lg mb-4">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <Image
                        src={postUser?.picture || "/next.svg"}
                        alt="Logo"
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                    <h3 className="text-sm text-blue-600 font-semibold">
                        <Link href={`/users/${postUser?.username}`} passHref>
                            {postUser?.username}
                        </Link>
                    </h3>

                    {session?.user?.id !== postUser?._id && (
                        <Follow followerId={session?.user?.id} followingId={postUser?._id} />
                    )}
                </div>

                {/* menu */}

                <DropdownMenu
                    items={post?.user === session?.user?.id ? updatedMenuItems : menuItems}
                    postId={post?._id}
                    authToken={session?.user?.authToken}
                    userId={session?.user?.id}
                    hideLikeCount={hideLikeCount}
                    turnOffComments={turnOffComments}
                >
                    {post?.user === session?.user?.id && (
                        <EditPost
                            post={post}
                            postId={post._id}
                            session={session}
                            refresh={refresh}
                        />
                    )}
                </DropdownMenu>

            </div>
            <div className="relative w-full h-0 ImagePost">
                <Image
                    src={post?.image}
                    alt="Post Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-md"
                />
            </div>


            <div className="flex items-center justify-between px-4 py-2">
                <div className={`flex items-center ${isModalOpen ? "" : "space-x-4"}`}>
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
                    <FiMessageCircle
                        className="text-gray-500"
                        size={20}
                        onClick={handleToggleModal}
                    />
                    {isCommentVisible && (
                        <>
                            {isModalOpen && (
                                <ModelComponent
                                    onClose={handleToggleModal}
                                    postId={post._id}
                                    session={session}
                                    refresh={refresh}
                                >
                                    {post?.comments?.length > 0 &&
                                        post?.comments?.map((comment: any, index: number) => (
                                            <Comment
                                                key={index}
                                                postId={post._id}
                                                comment={comment}
                                                session={session}
                                                refresh={refresh}
                                            />
                                        ))}
                                </ModelComponent>
                            )}
                        </>)}
                   <SharePost postId={post._id} />
                </div>
                <Bookmark postId={post?._id} userId={session?.user?.id} refresh={refresh} />
            </div>
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">
                    {isLikeVisible &&
                        <>
                            {post?.likes?.length > 0 && (
                                <h3 className="text-sm font-semibold">{post?.likes?.length} likes</h3>
                            )}
                        </>
                    }
                </div>
            </div>
            <div className="px-4 py-2 flex justify-start">
                <h3 className="text-sm font-semibold">{postUser?.username}</h3>
                <h3 className="text-sm font-semibold px-2">{post?.caption}</h3>
            </div>

            <div className="px-4 py-2 flex justify-start">
                <ViewAllComments postId={post?._id} refresh={refresh} />
            </div>
            {isCommentVisible &&
                <>
                    <div className="py-2 flex justify-start">
                        <AddComment postId={post._id} session={session} refresh={refresh} />
                    </div>
                </>
            }
        </div>
    );
};

export default PostComponent;
