import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const AdminHeader: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h1 className="text-xl font-semibold text-neutral-800">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-sm text-neutral-600">
            <User size={18} className="mr-2" />
            <span>{user?.email}</span>
          </div>
          
          <button
            onClick={() => signOut()}
            className="flex items-center text-neutral-600 hover:text-error-600 transition-colors"
            aria-label="Sign out"
          >
            <LogOut size={18} className="mr-1" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;