'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const MobileDropdown = () => {
  const { user, isLoading, setUser } = useAuth();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) return <span className="">Loading...</span>;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Logout failed: ${res.status}`);
      }

      setUser(null);
      setDropdownOpen(false); // Close dropdown after logout
      router.push('/'); // Redirect to home or login page
    } catch (err) {
      console.error('Logout error:', err);
      alert('Failed to log out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="w-5 h-5 rounded-full cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
          >
            <Avatar>
              <AvatarImage src={user.avatar} alt="User dropdown" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600 transition-all duration-200 ${
              dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="font-medium">{user.name || 'User'}</div>
              <div className="truncate text-gray-500 text-xs dark:text-gray-400">
                {user.email || 'user@example.com'}
              </div>
            </div>

            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
              </li>
            </ul>

            <div className="py-1">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-white transition-colors disabled:opacity-50"
              >
                {loggingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-4 font-mono font-bold">
          <Link href="/signup" className=" block md:hidden">
            <span className="text-gray-950 transition-all duration-100 hover:text-gray-700 cursor-pointer">
              Sign up
            </span>
          </Link>
          <Link href="/login" className="md:hidden">
            <span className="p-3 px-5  bg-gray-950 text-white transition-all duration-100 hover:bg-gray-900 cursor-pointer">
              Login
            </span>
          </Link>
        </div>
      )}
    </>
  );
};
