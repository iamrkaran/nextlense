import axios from '@/config/axiosInstance';

const fetchUsernameById = async (userId:string) => {
  try {  
    const response = await axios.get(`/users/${userId}`);
    return response.data.username;
  } catch (error) {
    console.error('Failed to fetch username:', error);
    return null;
  }
};

export default fetchUsernameById;
