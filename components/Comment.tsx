// import React, { useEffect, useState } from 'react';
// import { FiMessageCircle } from 'react-icons/fi';
// import AddComment from './AddComment';
// import axios from '@/config/axiosInstance';
// import fetchUsernameById from '@/utils/fetchUserDataById';
// import Image from 'next/image';


// type Comment = {
//   _id: string;
//   text: string;
//   user: string;
//   createdDate: Date;
// };

// type UserData = {
//   username: string;
//   picture: string;
// };

// type CommentProps = {
//   postId: string;
//   comment: Comment;
//   session: string;
//   key: number;
//   refresh: () => void;
// };


// const CommentsPage: React.FC<CommentProps> = ({
//   key,
//   postId,
//   comment,
//   session,
//   refresh,
// }) => {

//   const [username, setUsername] = useState<string>('');


 

//   useEffect(() => {
//     const PostDataFromRedux = useSelector((state: RootState) => state.post);
//     const fetchedComments: Comment[] = response.data.comments.comments;
//     setComments(fetchedComments);

//     const userIds = fetchedComments.map((comment) => comment.user);
//     const fetchedUserDatas = await Promise.all(userIds.map(fetchUserDataById));
//     setUserDatas(fetchedUserDatas as UserData[]); // 
 


//   return (
//     <div className="mt-2 space-y-2 border-b py-2">
//       <div className="flex items-start space-x-2" key={key}>
//         <div className="flex items-center space-x-2">
//           <Image
//             src={postUser?.picture || '/next.svg'}
//             alt="User Avatar"
//             width={36}
//             height={36}
//             className="rounded-full"
//           />

//           <div>
//             <h3 className="text-sm font-semibold pr-2">{username}</h3>
//             <p className="text-xs text-gray-400">
//               {comment.createdDate && getTimeAgo(comment.createdDate.toString())}
//             </p>
//           </div>
//         </div>
//         <div>
//           <p className="ml-4 px-2 text-left  text-sm text-gray-900 break-words">{comment.text}</p>
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default CommentsPage;

import React, { useEffect, useState } from 'react';
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

const Comment: React.FC<CommentProps> = ({ postId, comment, session, refresh }) => {
  const [userData, setUserData] = useState<any>(null); // Modify the type as per your user data type

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUserData = await fetchUserDataById(comment.user);
      setUserData(fetchedUserData);
    };

    fetchUser();
  }, [comment.user]);

  if (!userData) {
    return null; // You can render a loading state or handle it in your own way
  }

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

  return (
    <div className="mt-2 space-y-2 border-b py-2">
     <div className="flex items-start space-x-2" >
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
          <p className="ml-4 px-2 text-left  text-sm text-gray-900 break-words">{comment.text}</p>
        </div>
       
      </div>
    </div>
  );
};

export default Comment;


