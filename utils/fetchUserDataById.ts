import axios from '@/config/axiosInstance';

const fetchUserDataById = async (userId: string) => {
  try {  
    const response = await axios.get(`/users/?userId=${userId}`);
    return response.data; // Assuming the API returns the entire user data object
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

export default fetchUserDataById;
