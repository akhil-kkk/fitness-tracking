import React from 'react';
import { Menu, Home, Activity, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">FitTrack</span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="/" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                  <Home className="h-5 w-5 inline-block" />
                  <span className="ml-2">Dashboard</span>
                </a>
                <a href="/profile" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                  <User className="h-5 w-5 inline-block" />
                  <span className="ml-2">Profile</span>
                </a>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md hover:bg-indigo-700"
                >
                  <LogOut className="h-5 w-5 inline-block" />
                  <span className="ml-2">Logout</span>
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-indigo-700"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 rounded-md hover:bg-indigo-700"
              >
                Dashboard
              </a>
              <a
                href="/profile"
                className="block px-3 py-2 rounded-md hover:bg-indigo-700"
              >
                Profile
              </a>
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}