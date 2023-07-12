
"use client";
import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from '@/config/axiosInstance';
import uploadFiles from '@/config/s3';
import { getUserId } from '@/utils/session';
import Image from 'next/image';
import Layout from '@/components/Layout';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const useridData = await getUserId();
      console.log(useridData);
      setUserId(useridData);
     
    };
    fetchSession();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async (e) => {
        if (e.target?.result) {
          const buffer = new Uint8Array(e.target.result as ArrayBuffer);
          const url = await uploadFiles(buffer, file.name);
          setUploadedFileUrl(url);
          console.log(url);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }; 

  const handleCreatePost = async () => {
    try {
      
      if (uploadedFileUrl && userId) {
        await axios.post('/posts/create', {
          image: uploadedFileUrl,
          caption,
          user:userId,
        });
        
        setFile(null);
        setCaption('');
        setUploadedFileUrl('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeselectImage = () => {
    setFile(null);
    setUploadedFileUrl('');
  };

  return (
    <Layout>
    <div className="flex flex-col space-y-8 m-10 p-10">
    <input
      className="border border-gray-300 p-2 rounded"
      placeholder="Image"
      type="file"
      onChange={handleFileChange}
    />
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={handleUpload}
      disabled={!file || uploading}
    >
      Upload
    </button>
    {uploadedFileUrl && (
      <div className="flex items-center space-x-2">
        <Image width={100} height={100} className="max-w-xs" src={uploadedFileUrl} alt="Uploaded" />
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          onClick={handleDeselectImage}
        >
          X
        </button>
      </div>
    )}
    <input
      className="border border-gray-300 p-2 rounded"
      placeholder="Caption"
      value={caption}
      onChange={(e) => setCaption(e.target.value)}
    />
   
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={handleCreatePost}
      disabled={!uploadedFileUrl || !caption || !userId}
    >
      Create Post
    </button>
  </div>
  </Layout>
  
  );
};

export default FileUpload;
