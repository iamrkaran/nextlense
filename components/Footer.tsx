"use client";
import { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { getUsername, getPicture } from '@/utils/session'
import Image from 'next/image';

const Footer = () => {

  const { theme } = useTheme();
  useEffect(() => setMounted(true), []);
  const [mounted, setMounted] = useState(false);

  const [userData, setUserData] = useState<{ username: string | null, picture: string | null }>({ username: null, picture: null });

  useEffect(() => {
    const fetchUserData = async () => {
      const userNameData = await getUsername();
      const userPicDataUrl = await getPicture();
      setUserData({ username: userNameData, picture: userPicDataUrl });
    };
    fetchUserData();
  }, []);


  if (!mounted) return null;
  return (
    <footer className={`z-50 fixed bottom-0 mt-16 flex justify-around items-center py-3 bg-white dark:bg-gray-800 w-full border-t dark:border-gray-700 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <Link href="/home" passHref >
        <h3 className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
          <FaHome size={24} />
        </h3>
      </Link>
      <Link href="/explore" passHref >
        <h3 className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
          <FaSearch size={24} />
        </h3>
      </Link>
      <Link href="/create" passHref >
        <h3 className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
          <FaPlusSquare size={24} />
        </h3>
      </Link>
      <Link href="/notifications" passHref >
        <h3 className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
          <FaHeart size={24} />
        </h3>
      </Link>
      <Link href={`/users/${userData.username || 'profile'}`} passHref >
        <h3 className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
          {userData.picture ? (
            <Image
              src={userData.picture}
              alt="Profile"
              className="rounded-full w-8 h-8"
              width={32}
              height={32}
            />
          ) : (
            <FaUserCircle size={24} />
          )}

        </h3>
      </Link>

    </footer>
  );
};

export default Footer;
