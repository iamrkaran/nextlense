import React, { useEffect, useState, useMemo } from 'react';
import fetchUserDataById from '@/utils/fetchUserDataById';
import Image from 'next/image';

type CommentProps = {
  postId: string;
  comment: {
    user: string;
    text: string;
    createdDate: Date;
  };
  session: any;
  refresh: () => void;
};

type UserData = {
  username: string | null;
  picture: string | null;
  // Add other user data properties as needed
};

const Comment: React.FC<CommentProps> = ({ postId, comment, session, refresh }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Memoize the fetchUser function using useMemo
  const fetchUser = useMemo(async () => {
    if (!comment.user) {
      return null;
    }

    try {
      const fetchedUserData = await fetchUserDataById(comment.user);
      return fetchedUserData as UserData;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  }, [comment.user]);

  useEffect(() => {
    // Update the userData state with fetched user data
    const getUserData = async () => {
      if (fetchUser) {
        const user = await fetchUser;
        setUserData(user);
      }
    };

    getUserData();
  }, [fetchUser]);

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

  if (!userData) {
    return null;
  }

  return (
    <div className="mt-2 space-y-2 border-b py-2">
      <div className="flex items-start space-x-2">
        <div className="flex items-center space-x-2">
          <Image
            src={userData.picture || '/next.svg'}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <h3 className="text-sm font-semibold pr-2">{userData.username}</h3>
            <p className="text-xs text-gray-400">
              {comment.createdDate && getTimeAgo(comment.createdDate.toString())}
            </p>
          </div>
        </div>
        <div>
          <p className="ml-4 px-2 text-left text-sm text-gray-900 break-words">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
