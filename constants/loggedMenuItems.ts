import axios from "@/config/axiosInstance";
import { toast } from "react-toastify";

type ProfileMenuItem = {
  label: string;
  icon?: string;
  color?: string;
  action: (postId: string, authToken: string, userId: string) => void;
};

type Verification = {
  postId: string;
  userId: string;
  authToken: string;
  caption?: string;
};

const deletePost = async ({ postId, authToken, userId }: Verification) => {
  const confirmed = window.confirm("Are you sure you want to delete this post?");

  if (confirmed) {
    try {
      const response = await axios.delete(
        `/posts/delete?postId=${postId}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Post deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post", {
        position: toast.POSITION.TOP_CENTER,
      });
      throw error;
    }
  }
};

let isLikeCountHidden: boolean = false;

const toggleLikeCount = () => {
  isLikeCountHidden = !isLikeCountHidden;
  const message = isLikeCountHidden ? "Like count hidden" : "Like count shown";

  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};

let isCommentingTurnedOff: boolean = false;

const turnOffComments = () => {
  isCommentingTurnedOff = !isCommentingTurnedOff;
  const message = isCommentingTurnedOff
    ? "Commenting turned off"
    : "Commenting turned on";

  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
  });
  return isCommentingTurnedOff;
};

const cancelAction = () => {};

export const updatedMenuItems: ProfileMenuItem[] = [
  {
    label: "Delete",
    action: (postId, authToken, userId) =>
      deletePost({ postId, authToken, userId }),
    color: "text-red-500",
  },
  {
    label: isLikeCountHidden ? "Show like count" : "Hide like count",
    action: toggleLikeCount,
    color: "text-red-500",
  },
  {
    label: isCommentingTurnedOff ? "Turn on comments" : "Turn off comments",
    action: turnOffComments,
    color: "text-red-500",
  },
  {
    label: "Cancel",
    action: cancelAction,
    color: "text-gray-700",
  },
];
