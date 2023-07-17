"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from '@/config/axiosInstance';
import { toast } from 'react-toastify';
import { getUserId } from '@/utils/session';
import { useRouter } from 'next/navigation';
import { HashLoader } from 'react-spinners';

const EditProfile: React.FC = () => {
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');
  const [name ,setName] = useState('');
  const [gender, setGender] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleSave = async () => {
    try {
      const response = await axios.post('/users/accounts', {
        website,
        bio,
        gender,
        userId,
        name,
      });

      if (response.status === 200) {
        toast.success('Profile updated successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push(`/users/${userData.username}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating profile:', error);
      toast.error('Error updating profile', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUserData(response.data);
        setWebsite(response.data.website);
        setBio(response.data.bio);
        setGender(response.data.gender);
        setName(response.data.name);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex justify-center items-center">
            <HashLoader color="#36d7b7" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col w-1/2 space-y-4">
            <h1 className="text-2xl font-bold mb-5">Edit Profile</h1>

            <div className="flex flex-col space-y-2">
              <label htmlFor="website" className="font-bold">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="name"
                className="border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="website" className="font-bold">
                Website
              </label>
              <input
                id="website"
                type="text"
                placeholder="Your website"
                className="border p-2 rounded"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="font-bold">
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Your bio"
                className="border p-2 rounded"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="gender" className="font-bold">
                Gender
              </label>
              <select
                id="gender"
                className="border p-2 rounded"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>


            <button
              className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )
      }
    </Layout>
  );
};

export default EditProfile;
