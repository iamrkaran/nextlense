import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiFacebook, FiShare, FiTwitter } from 'react-icons/fi';
import SocialMediaIcon from './SocialMediaIcon'; // Replace with the actual path to your SocialMediaIcon component
import { toast } from 'react-toastify';

type SharePostProps = {
    postId: string;
};

const SharePost: React.FC<SharePostProps> = ({ postId }) => {
    const [shareableLink, setShareableLink] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Generate the shareable link based on the current hostname and the post ID
        const currentUrl = window.location.href;
        const shareableLink = `${currentUrl.split('/').slice(0, -1).join('/')}/posts/${postId}`;
        setShareableLink(shareableLink);
    }, [postId]);

    // Redirect to the post page when the shareable link is accessed directly
    useEffect(() => {
        if (pathname === `/posts/${postId}`) {
            console.log('Navigating to the post page directly.');
        }
    }, [pathname, postId]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink);
        toast.success('Link copied to clipboard.');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

   // Function to share on Twitter
   const shareOnTwitter = () => {
    // Construct the Twitter share URL
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableLink)}`;

    // Open the Twitter share URL in a new window
    window.open(twitterUrl, '_blank');
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    // Construct the Facebook share URL
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`;

    // Open the Facebook share URL in a new window
    window.open(facebookUrl, '_blank');
  };

    return (
        <div>

            <div className="flex items-center">
                <FiShare
                    className="text-gray-500 cursor-pointer"
                    size={20}
                    onClick={openModal}
                />
            </div>

            {/* Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
                    <div className="bg-gray-300 rounded-lg p-6 w-full max-w-md">
                        <h2 className="mb-4 text-lg font-bold">Share Post</h2>
                        <span className='text-sm text-blue-600'>{shareableLink}</span>
                        <div className="flex space-x-4 mt-8">
                            {/* Add buttons or links here to share the post on various platforms */}
                            {/* Replace the placeholder icons with your actual social media icons */}
                            <SocialMediaIcon onClick={shareOnTwitter} icon={<FiTwitter size={32} />} />
                            <SocialMediaIcon onClick={shareOnFacebook} icon={<FiFacebook size={32} />} />
                        </div>

                        <button
                            onClick={handleCopyLink}
                            className="block w-full px-4 py-2 mt-8 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Copy Link
                        </button>

                        <button
                            className="block w-full px-4 py-2 mt-4 text-center text-white bg-red-500 hover:bg-red-600 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharePost;
