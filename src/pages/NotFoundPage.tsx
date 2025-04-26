import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-4xl font-serif font-bold text-neutral-800 mt-4">Page Not Found</h2>
          <p className="text-xl text-neutral-600 mt-4 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="mt-8">
            <Link to="/" className="btn btn-primary mr-4">
              Go Home
            </Link>
            <Link to="/blog" className="btn btn-outline">
              Browse Blog
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;