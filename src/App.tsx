import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBlogPostsPage from './pages/admin/AdminBlogPostsPage';
import AdminCreateBlogPostPage from './pages/admin/AdminCreateBlogPostPage';
import AdminEditBlogPostPage from './pages/admin/AdminEditBlogPostPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboardPage />} />
          <Route path="blog-posts" element={<AdminBlogPostsPage />} />
          <Route path="blog-posts/create" element={<AdminCreateBlogPostPage />} />
          <Route path="blog-posts/edit/:id" element={<AdminEditBlogPostPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;