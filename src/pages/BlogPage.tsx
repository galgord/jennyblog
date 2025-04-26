import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import BlogCard from '../components/BlogCard';
import FeaturedPost from '../components/FeaturedPost';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
        
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching blog posts:', error);
      } else if (data) {
        if (!selectedCategory && data.length > 0) {
          setFeaturedPost(data[0]);
          setPosts(data.slice(1));
        } else {
          setFeaturedPost(null);
          setPosts(data);
        }
        
        // Extract unique categories
        const allCategories = data
          .map(post => post.category)
          .filter((category): category is string => 
            category !== null && category !== undefined
          );
        setCategories([...new Set(allCategories)]);
      }
      
      setLoading(false);
    };
    
    fetchBlogPosts();
  }, [selectedCategory]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="container-custom">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-primary-50 max-w-3xl"
          >
            Insights, experiences, and advice for those living with trigeminal neuralgia.
          </motion.p>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="mb-10">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === null
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  All Posts
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {featuredPost && !selectedCategory && <FeaturedPost post={featuredPost} />}
              
              {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-medium text-neutral-700 mb-2">No posts found</h3>
                  <p className="text-neutral-500">
                    {selectedCategory
                      ? `There are no posts in the ${selectedCategory} category yet.`
                      : 'There are no blog posts available yet.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;