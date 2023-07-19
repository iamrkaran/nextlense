"use client"
import { useState, useEffect } from 'react';
import socket from '@/utils/socket';
import MModalComponent from '@/components/MModalComponent';
import Image from 'next/image';
import axiosInstance from '@/config/axiosInstance';
import ChatLayout from '@/components/ChatLayout';
import { getUserId, getUsername, getPicture } from '@/utils/session';
import Layout from '@/components/Layout';
import Link from 'next/link';

type User = {
  _id: string;
  name: string;
  username: string;
  picture: string;
  lastInteraction: number;
  lastMessage: Date;
};

const MessagesPage = () => {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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


  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users/allusers');
        const userData: User[] = response.data;

        // Sort users based on their interaction time (most recent first)
        const sortedUsers = userData.sort((a, b) => b.lastInteraction - a.lastInteraction);

        // Limit the number of displayed users to 10
        const limitedUsers = sortedUsers.slice(0, 10);

        setUsers(limitedUsers);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInteraction = (userId: string) => {
    // Find the user in the users array
    const userIndex = users.findIndex((user) => user._id === userId);

    if (userIndex !== -1) {
      // Update the user's interaction time
      const updatedUser: User = {
        ...users[userIndex],
        lastInteraction: Date.now(),
        lastMessage: new Date(),
      };

      // Move the user to the top of the list
      const updatedUsers = [
        updatedUser,
        ...users.slice(0, userIndex),
        ...users.slice(userIndex + 1),
      ];

      setUsers(updatedUsers);
    }
  };

  useEffect(() => {
    socket.on('interaction', handleInteraction);

    return () => {
      socket.off('interaction', handleInteraction);
    };
  }
    , [users]);




  const handleSendMessage = () => {
    if (selectedUser && newMessage) {
      socket.emit('message', { user: selectedUser, message: newMessage });
      setNewMessage('');
    }
  };



  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSelection = (user: User) => {
    setSelectedUser(user as User);
    setIsModalOpen(false);
  };


  return (

    <div className="flex w-full h-full bottom-5 bg-gray-900">
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <div className="p-4 space-x-4">
        <Link href="/home">
          <span className='bg-blue-600 p-2 text-gray-100 rounded-md'> Home</span>
        </Link>
        </div>

        <div className="flex flex-col space-y-2">
          {users.map((user, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleUserSelection(user)}
            >
              <div className="flex items-center space-x-2 ">

                <div className="flex justify-center">
                  <Image
                    width={48}
                    height={48}
                    src={user.picture}
                    alt={user.name}
                    className="w-12 h-12 rounded-full sm:w-10 sm:h-10 sm:ring-2 sm:ring-blue-500"
                  />
                </div>

                <div className='hidden md:block lg:block'>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-center h-full">

          {selectedUser ? (
            <div className="flex flex-col rounded-lg w-full">
              <div className="flex items-center">
                <ChatLayout
                  senderId={user}
                  receiverId={selectedUser._id}
                  Name={selectedUser.name}
                  userImage={selectedUser.picture}
                  userName={selectedUser.username}
                  activeTime={selectedUser.lastMessage} />
              </div>
            </div>
          ) : (
            <button
              onClick={handleOpenModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send Message
            </button>
          )}


        </div>
      </div>
      {isModalOpen && (
        <MModalComponent onClose={handleCloseModal}>
          <div className="flex-grow flex flex-col rounded-lg ">
            <input
              type="text"
              placeholder="Search User"
              className="border rounded-lg p-2 mb-2"
            />
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message"
              className="border rounded-lg p-3 mb-4 pb-3 h-80 resize-none flex-grow"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-lg w-full"
            >
              Send
            </button>
          </div>
        </MModalComponent>
      )}
    </div>

  );
};

export default MessagesPage; 
