"use client";
import React, { useState, useEffect } from 'react';
import { getUserId } from '@/utils/session';

const Page = () => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getUserId();
      console.log(sessionData);
      setSession(sessionData);
     
    };
    fetchSession();
  }, []);

  return (
    <div>
      <h1>
        Hello World {session}
      </h1>
    </div>
  );
};

export default Page;
