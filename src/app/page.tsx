import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-primary">Welcome to myjobb AI</h1>
        <p className="mb-4 items-center">Please login to access the dashboard</p>
        <Link href="/auth/login">
          <button className=" bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}