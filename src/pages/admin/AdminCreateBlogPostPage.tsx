import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';
import BlogPostForm from '../../components/admin/BlogPostForm';

type BlogPost = Omit<Database['public']['Tables']['blog_posts']['Insert'], 'id' | 'created_at' | 'updated_at'>;

const AdminCreateBlogPostPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (data: BlogPost) => {
    if (!user) {
      setError('You must be logged in to create a post');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          ...data,
          author_id: user.id,
        });
        
      if (insertError) {
        throw insertError;
      }
      
      navigate('/admin/blog-posts');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        <p className="text-neutral-500">Create a new blog post to share with your audience</p>
      </div>
      
      {error && (
        <div className="bg-error-100 text-error-800 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <BlogPostForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AdminCreateBlogPostPage;