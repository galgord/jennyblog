import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate, createImageUrl } from '../lib/utils';
import { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card group h-full flex flex-col"
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-video">
        <img 
          src={createImageUrl(post.featured_image_url)} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.category && (
          <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-sm text-neutral-500 mb-2">
          {formatDate(post.created_at)}
        </div>
        <Link to={`/blog/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold font-serif text-neutral-800 transition-colors group-hover:text-primary-600">
            {post.title}
          </h3>
        </Link>
        <p className="text-neutral-600 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <Link 
          to={`/blog/${post.slug}`} 
          className="text-primary-600 font-medium inline-flex items-center group-hover:underline"
        >
          Read More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;