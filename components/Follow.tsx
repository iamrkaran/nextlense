import React, { useState, useEffect } from 'react';
import axios from '@/config/axiosInstance';
import { toast } from 'react-toastify';

type FollowProps = {
  followerId: string;
  followingId: string;
}

const Follow = ({ followerId, followingId }: FollowProps) => {
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
      const updatedFollowingStatus = !isFollowing; // Calculate the updated following status
  
      setIsFollowing(updatedFollowingStatus); // Update the button immediately
  
      const response = await axios.post('/users/follow', { followerId, followingId });

      toast.success(`You ${updatedFollowingStatus ? 'followed' : 'unfollowed'} this user`, {
        position: toast.POSITION.TOP_CENTER,
      });
  
      if (response.status !== 200) {
        // If the request fails, revert the button to the previous following status
        setIsFollowing(!updatedFollowingStatus);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating following status', {
        position: toast.POSITION.TOP_CENTER,
      });
      // If an error occurs, revert the button to the previous following status
      setIsFollowing(!isFollowing);
    }
  };
  

  return (
    <button
      className={`px-4 py-2 font-bold text-sm ${isFollowing ? 'text-red-500' : 'text-blue-900 hover:text-blue-500'
        } focus:ring-4 focus:ring-blue-300 focus:outline-none rounded transition duration-200 ease-in-out`}
      onClick={toggleFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>

  );
};

export default Follow;
