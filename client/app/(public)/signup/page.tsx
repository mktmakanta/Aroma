'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  // CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  UserRound,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SignUpPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/v1/users/signup', {
        method: 'POST',
        credentials: 'include', // ensures cookie is set
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || 'Signup failed. Try again.');
      }

      setStatus('success');

      // ✅ Refetch user immediately after signup
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      setTimeout(() => router.push('/products'), 1000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/signup-page.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#b8a18c] p-6">
        <div className="w-full max-w-md space-y-5 bg-[#b8a18c] text-white">
          <div className=" flex justify-between items-center text-xs h-10 w-full mb-20  text-white">
            <div className="flex items-center space-x-2">
              <UserRound />
              <h3>NEW ACCOUNT</h3>
            </div>
            <Link href="/" className="hover:text-[#d1bead] cursor-pointer">
              <X />
            </Link>
          </div>

          <div className="flex justify-between text-5xl">
            <h2 className=" font-semibold font-geist ">Sign Up</h2>
            <Link href="/login">
              <h2 className="text-[#d1bead] font-semibold font-geist ">
                Login
              </h2>
            </Link>
          </div>
          <p className="text-sm text-white/80">
            Sign up for an account using email and password
          </p>

          {status === 'error' && (
            <Alert
              variant="destructive"
              className="border-red-500 bg-red-100 text-red-800"
            >
              <AlertTriangle className="h-3 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-transparent p-4 py-6 w-2/3  border-white/80  text-white placeholder:text-white/60 rounded-none"
                placeholder="Enter Fullname"
              />
            </div>
            <div className="space-y-2">
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
                placeholder="example@mail.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative w-2/3">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  className="bg-transparent p-4 py-6   border-white/80 placeholder:text-xl    text-white placeholder:text-white/60 rounded-none pr-10"
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

            <div className="space-y-2">
              <Label htmlFor="confirm password" className="text-white">
                Confirm Password
              </Label>
              <div className="relative w-2/3">
                <Input
                  id="password"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent p-4 py-6   border-white/80 placeholder:text-xl    text-white placeholder:text-white/60 placeholder:selection:text-green-400 rounded-none pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
                >
                  {showPasswordConfirm ? (
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
              {loading ? 'Signing up...' : 'SIGN UP →'}
            </Button>
          </form>

          {/* Social signup */}

          <div>
            <span>Sign up using these services below: </span>
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
