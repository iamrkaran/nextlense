import React, { useEffect, useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import AddComment from './AddComment';
import axios from '@/config/axiosInstance';
import fetchUsernameById from '@/utils/fetchUsernameById';
import Image from 'next/image';


type Comment = {
  user: string;
  text: string;
  createdDate: Date;
};

type CommentProps = {
  postId: string;
  postUser: any;
  comment: Comment;
  session: string;
  key: number;
  refresh: () => void;
};


const Comment: React.FC<CommentProps> = ({
  key,
  postId,
  postUser,
  comment,
  session,
  refresh,
}) => {

  const [username, setUsername] = useState<string>('');


  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (minutes < 1440) {
      return `${Math.floor(minutes / 60)}h ago`;
    } else {
      return `${Math.floor(minutes / 1440)}d ago`;
    }
  };

  const userId = postUser?._id;

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await fetchUsernameById(userId);
        setUsername(fetchedUsername);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsername();
  }, [userId]);


  return (
    <div className="mt-2 space-y-2 border-b py-2">
      <div className="flex items-start space-x-2" key={key}>
        <div className="flex items-center space-x-2">
          <Image
            src={postUser?.picture || '/next.svg'}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />

          <div>
            <h3 className="text-sm font-semibold pr-2">{username}</h3>
            <p className="text-xs text-gray-400">
              {comment.createdDate && getTimeAgo(comment.createdDate.toString())}
            </p>
          </div>
        </div>
        <div>
          <p className="ml-4 px-2 text-left  text-sm text-gray-900 break-words">{comment.text}</p>
        </div>
       
      </div>
    </div>
  );
};

export default Comment;
