import React, { useEffect, useState } from 'react';
import { FaPhone, FaVideo, FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import socket from '@/utils/socket';
import { toast } from 'react-toastify';
import { RootState } from '@/config/store';
import axiosInstance from '@/config/axiosInstance';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchChatMessages } from '@/reducers/chatSlice';
import { useSession } from 'next-auth/react';
import Chat from './Chat';
import Footer from './Footer';



interface ChatLayoutProps {
    senderId: string;
    receiverId: string;
    userImage: string;
    userName: string;
    activeTime: Date;
    Name: string;
}

type Message = {
    content: string;
    sender: string;
    receiver: string;
    timestamp: Date;
};


const ChatLayout: React.FC<ChatLayoutProps> = ({
    senderId,
    receiverId,
    userImage,
    userName,
    activeTime,
    Name,
}) => {
    const [newMessage, setNewMessage] = useState('');

    const messages = useSelector((state: RootState) => state.chat.messages);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();

    const { data: session, status } = useSession()

    const sendMessage = async (message: Message) => {
        try {
            const response = await axiosInstance.post('/chat', message);
            return response.data;
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchChatMessages(senderId, receiverId));
            } catch (error) {
                console.error('Failed to fetch chat messages:', error);
            }
        };

        fetchData();
    }, [dispatch, senderId, receiverId]);

    const handleSendMessage = async () => {
        try {
            const messageData = {
                content: newMessage,
                sender: senderId,
                receiver: receiverId,
                timestamp: new Date(),
            };

            await sendMessage(messageData);

            socket.emit('chatMessage', {
                senderId,
                receiverId,
                message: newMessage,
            });


            toast.success('Message sent!');
            setNewMessage('');
            dispatch(fetchChatMessages(senderId, receiverId));

        } catch (error) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message');
        }
    };


    return (
        <>
            <div className="h-screen w-full flex flex-col bg-white">
                {/* Navbar */}
                <div className="bg-gray-200 py-4 px-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={userImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
                        <div>
                            <p className="font-semibold">{Name}</p>
                            <p className="text-xs text-gray-600">Active {new Date().toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex text-2xl items-center space-x-4">
                        <FaPhone className="text-gray-600 cursor-pointer" />
                        <FaVideo className="text-gray-600 cursor-pointer" />
                        <FaUserCircle className="text-gray-600 cursor-pointer" />
                    </div>
                </div>

                {/* Body */}
                <div className="flex-grow p-4 overflow-y-auto text-red-500">
                    <div className="flex flex-col space-y-4">
                        <Chat
                            senderUser={userName}
                            senderUserImage={userImage}
                            currentUser={senderId}
                            messages={messages}
                        />

                    </div>
                </div>

                {/* Footer */}
                < div className="bg-gray-200 py-2 px-4 flex items-center" >
                    <div className="flex items-center space-x-2">
                        {/* Emoji Mart */}
                        {/* Attach File */}
                        {/* Like */}
                    </div>
                    <input
                        type="text"
                        className="flex-grow px-3 py-2 text-gray-900 rounded-full bg-white focus:outline-none"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
            
        </>
    );
};

export default ChatLayout;
