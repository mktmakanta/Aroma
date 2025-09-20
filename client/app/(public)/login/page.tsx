'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        credentials: 'include', // ensures cookie is set
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Invalid email or password');

      setStatus('success');

      // ✅ Refetch user immediately
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      setTimeout(() => router.push('/products'), 1000);
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left image */}
      <div className="hidden md:block md:w-1/2">
        <Image
          src={'/login.jpeg'}
          alt="Login background"
          className="h-full w-full object-cover"
          width={100}
          height={100}
        />
      </div>

      {/* Right form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#b8a18c] p-6">
        <div className="w-full max-w-md space-y-6 bg-[#b8a18c] text-white">
          <h2 className="text-3xl font-semibold">Login</h2>
          <p className="text-sm text-white/80">
            Get back to your account with email
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-white/40 text-white placeholder:text-white/60"
                placeholder="sample@mail.com"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent border-white/40 text-white placeholder:text-white/60 pr-10"
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
              className="w-full bg-white text-[#b8a18c] hover:bg-white/90"
            >
              {loading ? 'Logging in...' : 'LOGIN NOW →'}
            </Button>
          </form>

          {/* Alerts */}
          {status === 'success' && (
            <Alert className="border-green-500 bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4" />
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
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Invalid email or password.</AlertDescription>
            </Alert>
          )}

          {/* Social login */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-[#b8a18c] hover:bg-white/90"
            >
              f
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-[#b8a18c] hover:bg-white/90"
            >
              t
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-[#b8a18c] hover:bg-white/90"
            >
              G
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
