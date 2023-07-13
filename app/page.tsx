"use client";

import { Session } from 'next-auth';
import { User } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AuthProviders from '@/components/AuthProviders';

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
        router.push(`/home`);
      }
    });
  },);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <h1 className="mb-6 text-3xl font-bold text-blue-600">
        Next lense Production Test closed integration tests!.
      </h1>
      <div className="text-2xl">Welcome {session ? session?.user?.name : 'Guest'}!</div>

      <AuthProviders />
    </div>
  );
};

export default Page;
