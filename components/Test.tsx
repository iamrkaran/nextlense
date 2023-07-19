"use client"
import React, { useState, useEffect } from 'react';

import { getUserId, getUsername, getPicture } from '@/utils/session';

type Props = {};

const Test: React.FC<Props> = () => {
  const [user, setUser] = useState<string>('');
  const [picture, setPicture] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      const userId = await getUserId();
      setUser(userId as string);

      const username = await getUsername();
      setUsername(username as string);

      const picture = await getPicture();
      setPicture(picture as string);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Test</h1>
      <h2>User ID: {user}</h2>
      <h2>Username: {username}</h2>
      <img src={picture} alt="Profile Picture" />
    </div>
  );
};

export default Test;
