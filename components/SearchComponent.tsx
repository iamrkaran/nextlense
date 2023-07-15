import React, { useState, useEffect } from 'react';
import axios from '@/config/axiosInstance';
import Link from 'next/link';
import Image from 'next/image';
import Follow from './Follow';
import { getUserId } from '@/utils/session';

type User = {
    _id: string;
    name: string;
    username: string;
    email: string;
    picture: string;
    createdDate: Date;
    isOAuthUser: boolean;
};

const SearchComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<any>(null);

    useEffect(() => {
        const fetchUserId = async () => {
          const id = await getUserId();
          setCurrentUserId(id);
        };
    
        fetchUserId();
      }, []);

      useEffect(() => {
        let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
    
        const delayedSearch = () => {
            const fetchSearchResults = async () => {
                try {
                    const response = await axios.get('/users/search', {
                        params: { query: searchQuery },
                    });
                    setSearchResults(response.data);
                } catch (error) {
                    console.error('Failed to fetch search results:', error);
                }
            };
    
            debounceTimeout = setTimeout(fetchSearchResults, 500);
        };
    
        debounceTimeout && clearTimeout(debounceTimeout);
        delayedSearch();
    
        return () => {
            debounceTimeout && clearTimeout(debounceTimeout);
        };
    }, [searchQuery]);
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="relative flex-grow mx-5">
            <input
                type="search"
                placeholder="Search..."
                className="w-full p-2 rounded-md border-2 bg-white border-gray-400"
                value={searchQuery}
                onChange={handleInputChange}
            />

            {searchResults.length > 0 && (
                <div className="absolute top-14 left-0 w-full max-h-60 overflow-y-auto bg-white border border-gray-400 rounded-md z-10">
                    {searchResults.map((result, index) => (
                        <Link key={index} href={`/users/${result.username}`} passHref>
                            <span className="flex items-center p-2 hover:bg-gray-100">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                        src={result.picture}
                                        alt="Profile Picture"
                                        width={30}
                                        height={30}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                                <div className="ml-2 flex-grow">
                                    <p className="text-sm font-semibold text-blue-500">
                                        <Link href={`/users/${result.username}`} passHref>
                                            {result.username}
                                        </Link>
                                    </p>
                                </div>
                                {currentUserId !== result?._id && (
                                 <Follow followerId={currentUserId} followingId={result?._id} />
                                )}
                            </span>
                        </Link>
                    ))}
                </div>
            )}


        </div>
    );
};

export default SearchComponent;
