import Link from 'next/link';
import { useAuthStore } from '../lib/authStore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container-main flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Emma
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>

          {user ? (
            <>
              <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <FiShoppingCart size={20} />
                Cart
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 p-4 space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="block text-gray-700 hover:text-blue-600">
            Products
          </Link>

          {user ? (
            <>
              <Link href="/cart" className="block text-gray-700 hover:text-blue-600">
                Cart
              </Link>
              <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full btn-primary text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block btn-secondary text-center">
                Login
              </Link>
              <Link href="/register" className="block btn-primary text-center">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
