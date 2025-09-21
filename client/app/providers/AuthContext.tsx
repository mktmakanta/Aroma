'use client';

import { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type User = {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  active?: boolean;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
  refetch: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/users/me', {
          credentials: 'include',
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            return null;
          }
          throw new Error(`Failed to fetch user: ${res.status}`);
        }

        const data = await res.json();
        return data.data?.user || null;
      } catch (error) {
        console.error('Auth fetch error:', error);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const setUser = (newUser: User | null) => {
    queryClient.setQueryData(['currentUser'], newUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
