'use client';

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/v1/users/me', {
        credentials: 'include',
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data.user;
    },
  });

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
