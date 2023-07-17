import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

type DropdownItem = {
  label: string;
  action: (postId: string, authToken: string, userId: string) => void;
  color?: string;
};

type DropdownMenuProps = {
  children: React.ReactNode;
  items: DropdownItem[];
  postId: string;
  userId: string;
  authToken: string;
  hideLikeCount?: () => void;
  turnOffComments?: () => void;
  cancelAction?: () => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  items,
  postId,
  authToken,
  userId,
  hideLikeCount,
  turnOffComments,

}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleAction = (item: DropdownItem) => {
    if (item.action) {
      item.action(postId, authToken, userId);
    }
  
    if (item.label === 'Cancel' && cancelAction) {
      cancelAction();
    }
  
    if ((item.label === 'Hide like count' || item.label === 'Show like count') && hideLikeCount) {
      hideLikeCount();
    }
  
    if ((item.label === 'Turn off comments' || item.label === 'Turn on commenting') && turnOffComments) {
      turnOffComments();
    }
  };
  

  const cancelAction = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          title="MORE"
          onClick={toggleDropdown}
          className="z-50 inline-flex justify-center items-center"
        >
          <FiMoreHorizontal className="text-gray-500" size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-b border-gray-300">
          <div
            className="z-50 flex flex-col justify-center align-center"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}

            {items.map((item, index) => (
              <button
                key={index}
                className={`block px-4 py-2 border-b border-gray-300 text-sm text-center ${item.color || 'text-gray-700'
                  } hover:bg-gray-100`}
                onClick={() => handleAction(item)}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
