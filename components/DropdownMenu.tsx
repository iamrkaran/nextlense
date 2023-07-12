import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

type DropdownItem = {
  label: string;
  action: () => void;
  color?: string;
};

type DropdownMenuProps = {
  items: DropdownItem[];
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button title='MORE' onClick={toggleDropdown} className="z-50 inline-flex justify-center items-center">
                    <FiMoreHorizontal className="text-gray-500" size={20} />
                </button>
            </div>

            {isOpen && (
                <div
                    className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-b border-gray-300"
                >
                    <div className="z-50 flex flex-col justify-center align-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                className={`block px-4 py-2 border-b border-gray-300 text-sm text-center ${item.color || 'text-gray-700'} hover:bg-gray-100`}
                                onClick={item.action}
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
