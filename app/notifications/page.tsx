"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axiosInstance from '@/config/axiosInstance';
import fetchUserDataById from '@/utils/fetchUserDataById';

type Post = {
  _id: string;
  user: string;
  caption: string;
  image: string;
  createdDate: Date;
  likes: string[];
  comments: { user: string; text: string; createdDate: Date }[];
};

type Notification = {
  type: 'like' | 'comment';
  postId: string;
  sender: string;
  timestamp: Date;
};

type Props = {};

const Page: React.FC<Props> = (props: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [senderNames, setSenderNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Fetch notifications from the API
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications/fetch');
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    // Fetch sender names for each notification
    const fetchSenderNames = async () => {
      const senderNamePromises = notifications.map((notification) => fetchUser(notification.sender));
      const senderNamesData = await Promise.all(senderNamePromises);
      const updatedSenderNames: { [key: string]: string } = {};
      notifications.forEach((notification, index) => {
        updatedSenderNames[notification.sender] = senderNamesData[index];
      });
      setSenderNames(updatedSenderNames);
    };

    fetchSenderNames();
  }, [notifications]);

  const fetchUser = async (userId: string) => {
    try {
      const userResponse = await axiosInstance.get(`/users/${userId}`);
      const user = userResponse.data;
      return user.name;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return '';
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <li key={index}>
                {notification.type === 'like' ? (
                  <p>
                    <span className="font-semibold">{senderNames[notification.sender]}</span> liked your post.
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">{senderNames[notification.sender]}</span> commented on your post.
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Page;
