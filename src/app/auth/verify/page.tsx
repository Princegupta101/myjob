'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Verification successful, redirecting to dashboard'); // Debug log
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to verify OTP');
      }
    } catch (err) {
      console.error('Verification error:', err); // Debug log
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to resend OTP');
      } else {
        setError('OTP resent successfully');
      }
    } catch (err) {
      console.error('Resend OTP error:', err); // Debug log
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-primary">Verify OTP</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          {error && <p className={error.includes('successfully') ? 'text-green-500' : 'text-red-500'} text-sm mb-4>{error}</p>}
          <Button type="submit" disabled={loading} className="w-full mb-2">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={loading}
            className="w-full"
          >
            Resend OTP
          </Button>
        </form>
      </div>
    </div>
  );
}