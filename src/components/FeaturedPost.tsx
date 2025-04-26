import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate, createImageUrl } from '../lib/utils';
import { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-xl overflow-hidden shadow-lg mb-12"
    >
      <div className="grid md:grid-cols-2 group">
        <div className="relative overflow-hidden aspect-video md:aspect-auto">
          <img 
            src={createImageUrl(post.featured_image_url)} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
        </div>
        
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center mb-4">
            <span className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
              Featured Post
            </span>
            {post.category && (
              <span className="ml-2 bg-secondary-100 text-secondary-800 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
            )}
          </div>
          
          <Link to={`/blog/${post.slug}`} className="block mb-3">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-neutral-800 transition-colors group-hover:text-primary-600">
              {post.title}
            </h2>
          </Link>
          
          <div className="text-sm text-neutral-500 mb-4">
            {formatDate(post.created_at)}
          </div>
          
          <p className="text-neutral-600 mb-6">
            {post.excerpt}
          </p>
          
          <Link 
            to={`/blog/${post.slug}`} 
            className="btn btn-primary inline-flex self-start items-center"
          >
            Read Full Article
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default FeaturedPost;