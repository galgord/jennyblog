import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';
import { formatDate, createImageUrl } from '../lib/utils';
import { Database } from '../lib/database.types';
import NotFoundPage from './NotFoundPage';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug as string)
          .eq('published', true)
          .single();
          
        if (error) {
          throw error;
        }
        
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-16">
        <div className="container-custom py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <NotFoundPage />;
  }

  return (
    <div className="pt-16">
      {/* Featured Image */}
      <div className="w-full h-80 md:h-96 relative">
        <img 
          src={createImageUrl(post.featured_image_url)} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <div className="mt-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Blog
          </Link>
        </div>
        
        {/* Post Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8"
        >
          {post.category && (
            <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutral-800 mb-6">
            {post.title}
          </h1>
          
          <div className="text-neutral-500 mb-8">
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            
            {post.updated_at !== post.created_at && (
              <span className="ml-4">
                Updated: {formatDate(post.updated_at)}
              </span>
            )}
          </div>
        </motion.div>
        
        {/* Post Content */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none pb-16"
        >
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </motion.article>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="border-t border-neutral-200 pt-6 pb-16">
            <h3 className="text-lg font-medium mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;