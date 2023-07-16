"use client";

import { Session } from 'next-auth';
import { User } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AuthProviders from '@/components/AuthProviders';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
import Link from 'next/link';

interface CustomUser extends User {
  username: string;
}

interface CustomSession extends Session {
  user: CustomUser;
}

const Page = () => {
  const router = useRouter();
  const [session, setSession] = useState<CustomSession | null>(null);
  useEffect(() => {
    getSession().then((session: any) => {
      setSession(session);
      if (session) {
        const authToken = session.user.accessToken;
        // console.log('authToken', authToken);
        Cookies.set('authToken', authToken, { expires: 1 * 24 * 60 * 60 });
        router.push(`/home`);
      }

    });

  },);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-100">
          Welcome {session ? session.user.name : 'Guest'} to Nextlense
        </h1>
        <p className="mt-3 text-lg text-gray-300">
          The next generation social media platform
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center sm:flex-row">
        <div className="w-full sm:w-1/2 sm:mr-10">
          <Image
            src="/slide3.jpg"
            alt="Nextlense Image"
            width={800}
            height={800}
            className="rounded-full border-8 border-gray-100"
          />

        </div>



        <div className="w-full sm:w-1/2 mt-10 sm:mt-0">
          <div className="flex flex-col items-center sm:flex-row sm:justify-center">
            <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-3">
              <AuthProviders />
            </div>
            <a
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 sm:block"
            >
              Learn More
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
