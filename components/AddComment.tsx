import React, { useState, FormEvent } from "react";
import axios from "@/config/axiosInstance";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";

interface AddCommentProps {
  postId: string;
  session: any;
  refresh:()=>void;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, session, refresh }) => {
  const [comment, setComment] = useState<string>('');

  const handleCommentChange = (emojiText: string) => {
    setComment(emojiText);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('/posts/comment', {
        postId,
        userId: session?.user?.id,
        comment
      });
      toast.success('Comment added successfully', {
        position: toast.POSITION.TOP_CENTER
      });

      setComment('');
      refresh();
    } catch (error) {
      toast.error('Error adding comment', {
        position: toast.POSITION.TOP_CENTER
      });   
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full border-b-0 focus-within:border-b focus-within:border-blue-500">
      <InputEmoji
        value={comment}
        onChange={handleCommentChange}
        cleanOnEnter
        theme="dark"
        borderColor="transparent"
        borderRadius={0}
        placeholder="Add a comment..."
        className="h-10 outline-none border-none border-b border-gray-300 focus:border-blue-500 resize-none overflow-hidden"
      />
 
      {comment ? (
        <button type="submit" className="px-2 text-blue-500">Post</button>
      ) : (
        <span>&nbsp; &nbsp;</span>
      )}
    </form>
  );
};


export default AddComment;
