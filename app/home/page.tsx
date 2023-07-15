"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import axios from "@/config/axiosInstance";
import { HashLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/config/store";
import { fetchPosts } from "@/reducers/postSlice";
import PostComponent from "@/components/Post";

type Post = {
  _id: string;
  user: string;
  caption: string;
  image: string;
  createdDate: Date;
  likes: string[];
  comments: { user: string; text: string; createdDate: Date }[];
};

const HomePage = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts() as any);
  }, [dispatch]);

  const refreshData = async () => {
    try {
      dispatch(fetchPosts() as any);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Layout>
      <div className="text-center bg-gray-900 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="py-12 mb-12">
          {posts.map((post: Post) => (
            <PostComponent
              key={post._id}
              post={post}
              session={session as any}
              refreshData={refreshData}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
