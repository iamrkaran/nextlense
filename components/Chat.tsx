import axiosInstance from '@/config/axiosInstance';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPhone, FaVideo, FaUserCircle } from 'react-icons/fa';

type Message = {
    content: string;
    sender: string;
    receiver: string;
    timestamp: Date;
};

type Props = {
    currentUser: string;
    senderUser: string;
    senderUserImage: string;
    messages: Message[];
};

const Chat: React.FC<Props> = ({ currentUser, messages, senderUser, senderUserImage }) => {
    const [receiverUserData, setReceiverUserData] = useState({
        userName: '',
        userImage: '',
    });

    const [currentUserData, setCurrentUserData] = useState({
        userName: '',
        userImage: '',
    });

    useEffect(() => {
        const fetchReceiverData = async () => {
            try {
                const response = await axiosInstance.get(`/users/?userId=${currentUser}`);
                setReceiverUserData({
                    userName: response.data.username,
                    userImage: response.data.picture,
                });
            } catch (error) {
                console.error('Error fetching receiver user data:', error);
            }
        };

        const fetchCurrentUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/?userId=${senderUser}`);
                setCurrentUserData({
                    userName: response.data.username,
                    userImage: response.data.picture,
                });
            } catch (error) {
                console.error('Error fetching current user data:', error);
            }
        };

        fetchReceiverData();
        fetchCurrentUserData();
    }, [currentUser, senderUser]);

    return (
        <div className="h-screen w-full flex flex-col bg-white">
            <div className="flex-grow p-4 overflow-y-auto text-red-500">
                <div className="flex flex-col space-y-4">
                    {/* Render chat messages */}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex flex-col space-y-1 ${message.sender === currentUser ? 'items-start' : 'items-end'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <Image
                                    width={24}
                                    height={24}
                                    src={message.sender === currentUser ? receiverUserData.userImage : senderUserImage}
                                    alt="User"
                                    className="w-6 h-6 rounded-full"
                                />
                                <p className="text-xs">
                                    {message.sender === currentUser ? receiverUserData.userName : senderUser}
                                </p>
                            </div>
                            <div
                                className={`px-4 py-2 rounded-lg inline-block ${message.sender === currentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chat;
