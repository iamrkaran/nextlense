"use client";
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import axiosInstance from '@/config/axiosInstance';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

type Post = {
    _id: string;
    user: string;
    caption: string;
    image: string;
    createdDate: Date;
    likes: string[];
    comments: { user: string; text: string; createdDate: Date }[];
};

const PostPage = () => {

    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axiosInstance.get(`/posts/byId/?postId=${postId}`);
                setPost(response.data);
               
            } catch (error) {
                console.error('Failed to fetch post details:', error);
            }
        };

        if (postId) {
            fetchPostDetails();
        }
    }, [postId]);

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center">
              <HashLoader color="#374fff" id="loader" size={50} />
              
            </div>
          </div>
        ) 
    }

    return (
        <Layout>
            <div className="flex mt-4 flex-col items-center justify-center w-full h-full">
                <div key={post._id} className="border border-gray-300 rounded-lg overflow-hidden">
                    <Image
                        priority
                        width={256}
                        height={256}
                        src={post.image || '/slide1.jpg'}
                        alt={post.caption} className="w-full h-64 object-cover" />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">{post.caption}</h2>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PostPage;
