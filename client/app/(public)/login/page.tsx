'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      setStatus('success');
      setEmail('');
      setPassword('');
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      setTimeout(() => router.push('/'), 1000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/login-page.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#b8a18c] p-6">
        <div className="w-full max-w-md space-y-6 bg-[#b8a18c] text-white">
          <div className="flex justify-between text-5xl">
            <h2 className=" font-semibold font-geist ">Login</h2>
            <Link href="/signup">
              <h2 className="text-[#d1bead] font-semibold font-geist ">
                Signup
              </h2>
            </Link>
          </div>
          <p className="text-sm text-white/80">
            Get back to your account with email
          </p>

          {status === 'success' && (
            <Alert className="border-green-500 bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                You are logged in successfully.
              </AlertDescription>
            </Alert>
          )}
          {status === 'error' && (
            <Alert
              variant="destructive"
              className="border-red-500 bg-red-100 text-red-800"
            >
              <AlertTriangle className="h-3 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage || 'Invalid email or password.'}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-white/80">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent p-4 py-6 w-2/3  border-white/80  text-white placeholder:text-white/60 rounded-none"
                placeholder="sample@mail.com"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between w-2/3">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-white hover:underline underline-offset-2  "
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative w-2/3">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent p-4 py-6   border-white/80 placeholder:text-xl text-white placeholder:text-white/60 rounded-none pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-3/6 bg-white/80 text-[#8e6540] rounded-none p-4 py-6 hover:bg-white/90"
            >
              {loading ? 'Logging in...' : 'LOGIN NOW →'}
            </Button>
          </form>

          {/* Social login */}
          <div>
            <span>Log in to account with </span>
            <div className="flex items-center  gap-4 pt-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-white text-[#b8a18c] hover:bg-[#d1bead] hover:text-white rounded-none cursor-pointer"
              >
                f
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white text-[#b8a18c] hover:bg-[#d1bead] hover:text-white rounded-none cursor-pointer"
              >
                t
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white text-[#b8a18c] hover:bg-[#d1bead] hover:text-white rounded-none cursor-pointer"
              >
                G
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
