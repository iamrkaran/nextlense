"use client";
import React, { useState, useEffect } from 'react';
import { getSessionData } from "@/utils/session";
import { getUsername } from '@/utils/session';
import Cookies from 'js-cookie';

const Page = () => {
  const [session, setSession] = useState<string | null>(null);


  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getUsername();
      // console.log(sessionData);
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
