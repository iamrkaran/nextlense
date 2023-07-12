import { useState } from 'react';
import { useTheme } from 'next-themes';
import { FiMoreHorizontal } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type ProfileMenuItem = {
  label: string;
  icon?: string;
  color?: string;
  action: () => void;
};

const ProfileMenu = ({ theme }: { theme: string }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: ProfileMenuItem[] = [
    {
      label: "Edit Profile",
      action: () => router.push('/users/accounts/edit'),
      color: "text-gray-700",
    },
    {
      label: "Dark Mode",
      action: () => setTheme(theme === 'light' ? 'dark' : 'light'),
      color: "text-gray-700",
    },
    {
      label: "Logout",
      action: () => signOut({ callbackUrl: `${window.location.origin}/` }),
      color: "text-red-500",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button title='menu' onClick={toggleDropdown} className="z-50 inline-flex items-center space-x-1">
        <span className="text-gray-500 text-2xl font-extrabold">
          <FiMoreHorizontal />
        </span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-b border-gray-300">
          <div className="flex flex-col justify-center align-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {menuItems.map((menuItem, index) => (
              <button
                key={index}
                onClick={menuItem.action}
                className={`block px-4 py-2 border-b border-gray-300 text-sm text-center ${menuItem.color} hover:bg-gray-100`}
                role="menuitem"
              >
                {menuItem.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
