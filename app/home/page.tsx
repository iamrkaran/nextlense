"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import axios from '@/config/axiosInstance';
import PostComponent from "@/components/Post";
import { HashLoader } from "react-spinners";
import { revalidateTag } from "next/cache";
import next from "next";

type Post = {
  _id: string;
  user: string;
  caption: string; 
  image: string;
  createdDate: Date;
  likes: string[];
  comments: { user: string, text: string, createdDate: Date }[];
};

type Session = ReturnType<typeof useSession>['data'];

const HomePage = ({ initialPosts }: { initialPosts: Post[] }) => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [postLoading, setPostLoading] = React.useState<boolean>(false);

  const fetchPosts = () => {
    if (!session) return;

    setPostLoading(true);
    axios
      .get('/posts')
      .then((res) => {
        setPosts(res.data);
        setPostLoading(false);
        revalidateTag('posts');
      })
      .catch((err) => {
        setPostLoading(false);
      });
  };

  // Fetch posts initially when the session changes
  React.useEffect(() => {
    fetchPosts();
  }, [session]);

  if (sessionStatus === 'loading' || postLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <Layout>
    <div className="text-center bg-gray-900 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="py-12 mb-12">
        {posts && posts.map((post: Post) => (
          <PostComponent key={post._id} post={post} session={session as Session} />
        ))}
      </div>
    </div>
  </Layout>
  );
};

export async function getServerSideProps(_ : any) {
  let initialPosts = [];
  try {
    const res = await axios.get('/posts');
    initialPosts = res.data;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      initialPosts,
    },
  };
}

export default HomePage;
