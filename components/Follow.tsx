import React, { useState, useEffect } from 'react';
import axios from '@/config/axiosInstance';

type FollowProps = {
  followerId: string;
  followingId: string;
}

const Follow = ({ followerId , followingId }:FollowProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(`/users/follow/${followerId}`);
        if (response.data.following.includes(followingId)) {
          setIsFollowing(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkFollowingStatus();
  }, [followerId, followingId]);

  const toggleFollow = async () => {
    try {
      const response = await axios.post('/users/follow', { followerId, followingId });
      
      if (response.status === 200) {
        setIsFollowing(!isFollowing); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button 
      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none rounded transition duration-200 ease-in-out"
      onClick={toggleFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default Follow;
