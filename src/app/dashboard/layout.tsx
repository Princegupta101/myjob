import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { verifyToken } from '@/lib/auth';
import clientPromise from '@/lib/db';
import Sidebar from '@/components/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  console.log('Token from cookie:', token); // Debug log

  if (!token) {
    console.log('No token provided, redirecting to login'); // Debug log
    redirect('/auth/login');
  }

  try {
    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded); // Debug log
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email: (decoded as { email: string }).email });

    console.log('User from DB:', user); // Debug log
    if (!user || !user.verified) {
      console.log('User not found or not verified, redirecting to login'); // Debug log
      redirect('/auth/login');
    }
  } catch (error) {
    console.error('Token verification error:', error); // Debug log
    redirect('/auth/login');
  }

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}