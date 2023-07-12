
"use client";
import { useState, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className={`top-0 flex justify-between items-center py-3 px-5 bg-white dark:bg-gray-800 w-full border-b dark:border-gray-700 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <Link href="/home" passHref >
        <h3>
          <Image src="/vercel.svg" width={30} height={30} alt="Logo" className="h-6 w-auto" />
        </h3>
      </Link>
      <div className="flex-grow mx-5">
        <input
          type="search"
          placeholder="Search..."
          className={`w-full p-2 rounded-md border-2 ${theme === 'dark' ? 'bg-gray-700 border-white' : 'bg-white border-gray-400'}`}
        />
      </div>
      <Link href="/messages" passHref >
        <h3 className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
          <FaEnvelope size={24} />
        </h3>
      </Link>
    </nav>
  );
};

export default Navbar;
