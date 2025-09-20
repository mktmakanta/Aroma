'use client';
import Link from 'next/link';
import { useAuth } from '@/app/providers/AuthContext';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const CurrentUserStatus = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <nav className="p-4">Loading...</nav>;

  return (
    <>
      {user ? (
        <>
          {/* <span className="mr-4">Hi, {user.name}</span> */}
          <button
            onClick={async () => {
              await fetch('http://localhost:5000/api/v1/users/logout', {
                method: 'POST',
                credentials: 'include',
              });
              router.refresh(); // refresh page and context
            }}
            className="text-red-500 font-mono"
          >
            <Avatar>
              <AvatarImage src="https://pbs.twimg.com/profile_images/1180903755908370432/YVm5TOrs_400x400.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
        </>
      ) : (
        <div className="flex space-x-4 font-mono">
          <Link
            href="/signup"
            className="text-black  hover:text-red-600 transition-all duration-100 flex gap-2"
          >
            <span>Sign Up</span>
          </Link>
          <Link
            href="/login"
            className="text-black  hover:text-red-600 transition-all duration-100 flex gap-2"
          >
            <span>Login</span>
          </Link>
        </div>
      )}
    </>
  );
};
