import axios from "@/config/axiosInstance";

const fetchChatMessages = async ({ sender, receiver }: { sender: string; receiver: string }) => {
  try {
    const response = await axios.get(
      `/chat/fetch?sender=${sender}&receiver=${receiver}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch chat messages:", error);
    return null;
  }
};

export default fetchChatMessages;
