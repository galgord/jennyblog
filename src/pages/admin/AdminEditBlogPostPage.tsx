import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';
import BlogPostForm from '../../components/admin/BlogPostForm';

type BlogPost = Omit<Database['public']['Tables']['blog_posts']['Update'], 'id' | 'created_at' | 'updated_at'>;

const AdminEditBlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      setIsFetching(true);
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again.');
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchPost();
  }, [id]);

  const handleSubmit = async (data: BlogPost) => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
        
      if (updateError) {
        throw updateError;
      }
      
      navigate('/admin/blog-posts');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post && !isFetching) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Post Not Found</h2>
        <p className="text-neutral-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/admin/blog-posts')}
          className="btn btn-primary"
        >
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        <p className="text-neutral-500">Update your blog post content</p>
      </div>
      
      {error && (
        <div className="bg-error-100 text-error-800 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        {post && (
          <BlogPostForm
            initialData={post}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditBlogPostPage;