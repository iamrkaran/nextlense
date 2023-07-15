import React, { useEffect, useState } from 'react';
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import axios from '@/config/axiosInstance' 

type PostProps = {
  postId: string;
  userId: string;
  refresh:() => void;
}

const Bookmark: React.FC<PostProps> = ({ postId, userId, refresh}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (userId && postId) {
        const response = await axios.get(`/users/savedPosts?userId=${userId}`);
        const savedPosts = response.data;
        const isPostSaved = savedPosts.some((post: any) => post._id === postId);
        setIsSaved(isPostSaved);
      } else {
        console.log('UserId or PostId is undefined');
      }
    }

    if(userId && postId) {
      fetchSavedStatus();
    }
    
  }, [postId, userId]);

  

  const handleBookmark = async () => {
    await axios.post('/users/savedPosts', { userId, postId });
    refresh();
    setIsSaved(!isSaved);
  }

  return (
    <div onClick={handleBookmark} className="cursor-pointer">
      {isSaved ? (
        <BsBookmarkFill className="text-red-500" />
      ) : (
        <BsBookmark className="text-gray-500" />
      )}
    </div>
  );
}

export default Bookmark;
