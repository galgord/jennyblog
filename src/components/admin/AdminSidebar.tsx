import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/blog-posts', label: 'Blog Posts', icon: <FileText size={18} /> },
    { path: '/admin/testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
  ];
  
  return (
    <aside className="w-64 bg-primary-800 text-white hidden md:flex flex-col">
      <div className="p-6 border-b border-primary-700">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-serif font-bold">Jenny Gordon</span>
        </Link>
        <div className="text-primary-300 text-sm mt-1">Admin Panel</div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-md transition-colors
                  ${isActive(item.path)
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700/50'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;