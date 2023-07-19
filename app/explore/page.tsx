"use client"
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axiosInstance from '@/config/axiosInstance';
import Image from 'next/image';

type Post = {
  _id: string;
  user: string;
  caption: string;
  image: string;
  createdDate: Date;
  likes: string[];
  comments: { user: string; text: string; createdDate: Date }[];
};

type Props = {};

const Page: React.FC<Props> = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Randomize the order of posts
  const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shuffledPosts.map((post) => (
          <div key={post._id} className="border border-gray-300 rounded-lg overflow-hidden">
            <Image src={post.image} alt={post.caption} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{post.caption}</h2>
              <p className="text-gray-600">By {post.user}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Page;
