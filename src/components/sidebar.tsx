'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiHome, FiLogOut, FiBarChart } from 'react-icons/fi';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };
  const handleAnalyticsCharts = () => {
    router.push('/dashboard/analytics');
  };

  return (
    <div className="w-64 bg-white text-black h-screen p-4 m-4">
      <h2 className="text-2xl font-bold mb-6">Myjob AI</h2>
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-primary/80 rounded">
          <FiHome />
          <span>Dashboard</span>
        </Link>
        <button
          onClick={handleAnalyticsCharts}
          className="flex items-center space-x-2 p-2 hover:bg-primary/80 rounded w-full text-left"
        >
          <FiBarChart />
          <span>AnalyticsCharts</span>
        </button>
         <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 hover:bg-primary/80 rounded w-full text-left"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}