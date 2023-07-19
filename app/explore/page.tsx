"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import axiosInstance from '@/config/axiosInstance';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts/limit');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const userCache: { [userId: string]: string } = useMemo(() => ({}), []);

  const fetchUser = async (userId: string) => {
    // Check if user data is already cached
    if (userCache[userId]) {
      return userCache[userId];
    }

    try {
      const userResponse = await axiosInstance.get(`/users/${userId}`);
      const user = userResponse.data;
      userCache[userId] = user.username;
      return user.username;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return '';
    }
  };

  // Randomize the order of posts
  const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);

  return (
    <Layout>
      <div className='mb-16'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {shuffledPosts.map((post) => (
            <div key={post._id} className="border border-gray-300 rounded-lg overflow-hidden">
              <Image
                priority
                width={256}
                height={256}
                src={post.image || '/slide1.jpg'}
                alt={post.caption} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{post.caption}</h2>
                <p className="text-blue-600 cursor-pointer hover:text-blue-900" onClick={async () => {
                  const username = await fetchUser(post.user);
                  router.push(`/users/${username}`);
                }}>
                  <span>@{userCache[post.user] || fetchUser(post.user)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
