import React from 'react';
import { FiTwitter, FiFacebook } from 'react-icons/fi';

type SocialMediaIconProps = {
  onClick: () => void;
  icon: React.ReactNode; // Replace with actual icon type based on your icon package
};

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ onClick, icon }) => {
  return (
    <button onClick={onClick} className="p-2 hover:bg-gray-100 rounded-lg">
      {icon}
    </button>
  );
};

export default SocialMediaIcon;
