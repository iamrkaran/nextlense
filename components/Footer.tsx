"use client"
import { useState, useEffect, useMemo } from 'react';
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { getUsername, getPicture } from '@/utils/session'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type UserData = {
  username: string | null;
  picture: string | null;
};

const Footer = () => {
  const { theme } = useTheme();
  const router = usePathname();
  const [userData, setUserData] = useState<UserData>({ username: null, picture: null });
  const [mounted, setMounted] = useState(false);

    // Memoize the fetchUserData function using useMemo
  const fetchUserData = useMemo(async () => {
    const userNameData = await getUsername();
    const userPicDataUrl = await getPicture();
    return { username: userNameData, picture: userPicDataUrl };
  }, []);

  useEffect(() => {
    if (mounted) {
      // Use the intermediate state variable to set the userData state
      const updateUserData = async () => {
        const data = await fetchUserData;
        setUserData(data);
      };
      updateUserData();
    }
  }, [mounted, fetchUserData]);


  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer
    className={`z-50 fixed bottom-0 mt-16 flex justify-around items-center py-3 bg-black dark:bg-gray-800 w-full border-t dark:border-gray-700 ${
      theme === 'dark' ? 'text-white' : 'text-black'
    }`}
  >
    <Link href="/home" passHref>
      <h3
        className={`p-2 rounded-full ${
          router === '/home' ? 'bg-blue-700 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <FaHome size={24} />
      </h3>
    </Link>
    <Link href="/explore" passHref>
      <h3
        className={`p-2 rounded-full ${
          router === '/explore' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <FaSearch size={24} />
      </h3>
    </Link>
    <Link href="/create" passHref>
      <h3
        className={`p-2 rounded-full ${
          router === '/create' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <FaPlusSquare size={24} />
      </h3>
    </Link>
    <Link href="/notifications" passHref>
      <h3
        className={`p-2 rounded-full ${
          router === '/notifications' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <FaHeart size={24} />
      </h3>
    </Link>
    <Link href={`/users/${userData.username || 'profile'}`} passHref>
      <h3 className="p-2 rounded-full">
        {userData.picture ? (
          <Image src={userData.picture} alt="Profile" className="rounded-full w-8 h-8" width={32} height={32} />
        ) : (
          <FaUserCircle size={24} />
        )}
      </h3>
    </Link>
  </footer>
  );
};

export default Footer;
