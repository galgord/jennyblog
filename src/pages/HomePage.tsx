import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import FeaturedPost from '../components/FeaturedPost';
import BlogCard from '../components/BlogCard';
import TestimonialCard from '../components/TestimonialCard';
import jennyImage from '../assets/jenny.png';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const HomePage: React.FC = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch featured and recent posts
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);
        
      if (postsError) {
        console.error('Error fetching posts:', postsError);
      } else if (posts && posts.length > 0) {
        // Use the first post as featured and the rest as recent
        setFeaturedPost(posts[0]);
        setRecentPosts(posts.slice(1));
      }
      
      // Fetch testimonials
      const { data: testimonialData, error: testimonialError } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .limit(3);
        
      if (testimonialError) {
        console.error('Error fetching testimonials:', testimonialError);
      } else if (testimonialData) {
        setTestimonials(testimonialData);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
            >
              Finding Hope and Healing with Trigeminal Neuralgia
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-primary-50"
            >
              Personal coaching and mentoring for navigating life's challenges with chronic pain.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/about" className="btn btn-accent">
                Learn About Me
              </Link>
              <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50">
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src={jennyImage}
                alt="Jenny"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-bold text-neutral-900">Hi, I'm Jenny</h2>
              
              <p className="text-lg text-neutral-700">
                Living with trigeminal neuralgia taught me that even the most painful circumstances 
                can lead to profound personal growth. Now, I help others transform their relationship 
                with chronic pain.
              </p>
              
              <p className="text-lg text-neutral-700">
                Through personalized coaching, I guide you to build resilience, discover new purpose, 
                and create a fulfilling life despite the challenges of TN.
              </p>
              
              <Link 
                to="/about" 
                className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700"
              >
                Read My Story
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Blog Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-bold text-neutral-900 mb-4"
            >
              From The Blog
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-neutral-600 max-w-2xl mx-auto"
            >
              Insights, experiences, and advice for those living with trigeminal neuralgia.
            </motion.p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {featuredPost && <FeaturedPost post={featuredPost} />}
              
              {recentPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              )}
              
              <div className="text-center mt-12">
                <Link to="/blog" className="btn btn-outline">
                  View All Posts
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-bold text-neutral-900 mb-4"
            >
              How I Can Help
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-neutral-600 max-w-2xl mx-auto"
            >
              Personalized coaching services tailored to your unique journey with trigeminal neuralgia.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">One-on-One Coaching</h3>
              <p className="text-neutral-600 mb-4">
                Personalized sessions focused on your specific challenges and goals. 
                We'll work together to develop strategies for pain management and emotional wellbeing.
              </p>
              <Link to="/contact" className="text-primary-600 font-medium hover:underline inline-flex items-center">
                Learn More
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="w-14 h-14 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Group Support</h3>
              <p className="text-neutral-600 mb-4">
                Join our community of TN warriors to share experiences, learn from others, 
                and build connections with people who truly understand what you're going through.
              </p>
              <Link to="/contact" className="text-primary-600 font-medium hover:underline inline-flex items-center">
                Learn More
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="w-14 h-14 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
              <p className="text-neutral-600 mb-4">
                Access curated information about trigeminal neuralgia, treatment options, 
                coping strategies, and lifestyle adjustments to help you live better with TN.
              </p>
              <Link to="/blog" className="text-primary-600 font-medium hover:underline inline-flex items-center">
                Browse Resources
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-serif font-bold text-neutral-900 mb-4"
              >
                Success Stories
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-neutral-600 max-w-2xl mx-auto"
              >
                Hear from others who have transformed their lives with coaching.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Call To Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-bold mb-6"
            >
              Ready to Transform Your Journey with Trigeminal Neuralgia?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 text-primary-100"
            >
              Take the first step toward reclaiming your life and finding new possibilities.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Schedule a Free Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;