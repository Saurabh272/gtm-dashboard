import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600">WeatherApp</span>
              </Link>
            </div>
            <div className="flex items-center">
              {user ? (
                <>
                  <Link href="/weather" className="btn btn-secondary mr-2">Weather</Link>
                  <button onClick={logout} className="btn btn-primary">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn btn-secondary mr-2">Login</Link>
                  <Link href="/register" className="btn btn-primary">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2023 WeatherApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}