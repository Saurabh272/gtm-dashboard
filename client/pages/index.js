import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to WeatherApp</h1>
      {user ? (
        <div>
          <p className="text-xl mb-4">Hello, {user.email}!</p>
          <Link href="/weather" className="btn btn-primary">
            Check Weather
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-xl mb-4">Please login or register to use the app.</p>
          <div className="space-x-4">
            <Link href="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}