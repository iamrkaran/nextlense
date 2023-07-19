import axios from "@/config/axiosInstance";
import { toast } from "react-toastify";

type ProfileMenuItem = {
  label: string;
  icon?: string;
  color?: string;
  action: (postId: string, authToken: string, userId: string) => void;
};

type DeletePost = {
  postId: string;
  userId: string;
  authToken: string;
};

const cancelAction = () => {
  return true;
};

const handleAddToFavorites = async (
  postId: string,
  authToken: string,
  userId: string
) => {
  try {
    const response = await axios.post("/posts/favorite", {
      postId,
      userId,
    });
    toast.success(response.data.message);
  } catch (error) {
    console.log(error);
  }
};

export const menuItems: ProfileMenuItem[] = [
  {
    label: "Report",
    action: () => toast.info("Reported"),
    color: "text-red-500",
  },
  // {
  //   label: "Add to favorites",
  //   action: handleAddToFavorites, 
  //   color: "text-gray-700",
  // },
  {
    label: "Cancel",
    action: cancelAction,
    color: "text-gray-700",
  },
];
