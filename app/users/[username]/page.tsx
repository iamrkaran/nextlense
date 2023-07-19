"use client";
import { getUserId } from '@/utils/session';
import { useState, useEffect, useMemo } from 'react';
import axios from '@/config/axiosInstance';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Layout from '@/components/Layout';
import { useRouter, useParams } from 'next/navigation';
import Follow from '@/components/Follow';
import ProfileMenu from '@/components/ProfileMenu';
import { HashLoader } from 'react-spinners';

const UserProfile = () => {
  const { username } = useParams();
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(theme === 'dark');
  const [userId, setUserId] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('POSTS');
  const [currentUserId, setCurrentUserId] = useState<any>(null);
  const [savedUserPosts, setSavedUserPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const savedPosts = useMemo(() => {
    return savedUserPosts.filter((post) => post.saved);
  }, [savedUserPosts]);

  const taggedPosts = useMemo(() => {
    return userPosts.filter((post) => post.tagged);
  }, [userPosts]);

  const filteredPosts = useMemo(() => {
    if (activeTab === 'POSTS') {
      return userPosts;
    } else if (activeTab === 'SAVED') {
      return savedUserPosts;
    } else if (activeTab === 'TAGGED') {
      return taggedPosts;
    }
    return [];
  }, [activeTab, userPosts, savedUserPosts, taggedPosts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const { data: userData } = await axios.get(`/users/allusers/${username}`);
          setUserData(userData);
          setUserId(userData._id);
          setIsLoading(false);

          const { data: postsResponse } = await axios.get(`/users/${userData._id}/posts`);
          setUserPosts(postsResponse);

          const { data: savedPostsResponse } = await axios.get(`/users/savedPosts?userId=${userData._id}`);
          setSavedUserPosts(savedPostsResponse);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setCurrentUserId(id);
    };

    fetchUserId();
  }, []);
  return (

    <>
      <Layout>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center">
              <HashLoader color="#36d7b7" />
            </div>
          </div>
        ) : (
          <>

            {userData?.name ? null : (
              <div className="flex justify-center items-center h-screen">
                <div className="flex justify-center items-center">
                  <h1 className="text-3xl font-bold">User not found</h1>
                </div>
              </div>
            )}


            {userData?._id && (
              <div className={`w-full h-screen flex flex-col items-center p-4 bg-gray-300 dark:bg-gray-800`}>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
                  <Image width={120} height={120} className="rounded-full" src={userData?.picture} alt="User avatar" />
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <h1 className="pr-4 text-lg font-bold text-gray-800 dark:text-white">{userData?.username ? userData?.username : "User not found"}</h1>

                      {currentUserId !== userId && (
                        <Follow followerId={currentUserId} followingId={userId} />
                      )}

                      <div className="pl-4 flex items-center font-2xl font-extrabold text-gray-900">
                        <ProfileMenu theme='dark' />
                      </div>
                    </div>
                    <h2 className="text-sm text-gray-800 dark:text-gray-200">{userData?.name}</h2>
                    <h2 className="text-sm text-gray-800 dark:text-gray-200 break-words">
                      {userData?.bio
                        ? userData?.bio
                        : "Constantly learning new things and sharing my knowledge with others."}
                    </h2>

                    <h3 className='text-blue-600 '>
                      {userData?.website && <a href={userData?.website} target="_blank" rel="noopener noreferrer">{userData?.website}</a>}
                    </h3>
                  </div>

                </div>

                <div className="flex border-b border-gray-200 dark:border-gray-700 text-center text-lg w-full">
                  <div className="flex-1 py-2 border-r border-gray-200 dark:border-gray-700">
                    <p><span className="font-bold">{userPosts?.length}</span></p>
                    <p className="text-gray-800 dark:text-gray-200">posts</p>
                  </div>
                  <div className="flex-1 py-2 border-r border-gray-200 dark:border-gray-700">
                    <p><span className="font-bold">{userData?.followers?.length}</span></p>
                    <p className="text-gray-800 dark:text-gray-200">followers</p>
                  </div>
                  <div className="flex-1 py-2">
                    <p><span className="font-bold">{userData?.following?.length}</span></p>
                    <p className="text-gray-800 dark:text-gray-200">following</p>
                  </div>
                </div>
                <div className="flex border-b border-gray-200 dark:border-gray-700 text-center text-lg w-full">
                  <button
                    className={`flex-1 py-2 border-r border-gray-200 dark:border-gray-700 focus:outline-none hover:text-blue-500 active:bg-blue-300 ${activeTab === 'POSTS' ? 'border-b-4 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('POSTS')}
                  >
                    <p className="text-gray-800 dark:text-gray-200">POSTS</p>
                  </button>

                  <button
                    className={`flex-1 py-2 border-r border-gray-200 dark:border-gray-700 focus:outline-none hover:text-blue-500 active:bg-blue-300  ${activeTab === 'SAVED' ? 'border-b-4 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('SAVED')}
                  >
                    <p className="text-gray-800 dark:text-gray-200">SAVED</p>
                  </button>
                  <button
                    className={`flex-1 py-2 border-gray-200 dark:border-gray-700 focus:outline-none hover:text-blue-500 active:bg-blue-300 ${activeTab === 'TAGGED' ? 'border-b-4 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('TAGGED')}
                  >
                    <p className="text-gray-800 dark:text-gray-200">TAGGED</p>
                  </button>
                </div>

                <div className="flex flex-wrap justify-center p-4">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="relative w-24 sm:w-64 h-24 sm:h-64 m-2">
                      <Image
                        alt="image"
                        src={post.image}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  ))}
                </div>

              </div>
            )}
          </>
        )}
      </Layout>
    </>


  );
};

export default UserProfile;
