"use client";
import { Session } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Layout from "@/components/Layout";
import axios from '@/config/axiosInstance';
import Post from "@/components/Post";
import { HashLoader } from "react-spinners";

interface CustomUser extends User {
  username: string;
  accessToken: string;
}

interface CustomSession extends Session {
  user: CustomUser;
  accessToken: string;
}

type Post = {
  _id: string;
  user: string;
  caption: string;
  image: string;
  createdDate: Date;
  likes: string[];
  comments: { user: string, text: string, createdDate: Date }[];
};

const HomePage = () => {
  const router = useRouter();
  const { username } = useParams();

  const [session, setSession] = useState<CustomSession | null>(null);
  const [posts, setPosts] = useState<Post[]>([]); // Create a state for the posts
  const [isLoading, setIsLoading] = useState(true); // Create a state for loading

  useEffect(() => {
    getSession().then((session: any) => {
      setSession(session);
    });

    axios
      .get('/posts')
      .then(response => {
        setPosts(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Set loading to false in case of an error
      });

  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="text-center bg-gray-900 min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="py-12 mb-12">
            {posts.map((post) => (
              <Post key={post._id} post={post} session={session} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
