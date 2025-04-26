import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Eye, Edit, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../lib/utils';
import { Database } from '../../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const AdminDashboardPage: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [publishedPosts, setPublishedPosts] = useState(0);
  const [draftPosts, setDraftPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch stats
      const { count: totalCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });
        
      const { count: publishedCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);
        
      // Fetch recent posts
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (totalCount !== null) setTotalPosts(totalCount);
      if (publishedCount !== null) setPublishedPosts(publishedCount);
      if (totalCount !== null && publishedCount !== null) setDraftPosts(totalCount - publishedCount);
      if (posts) setRecentPosts(posts);
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-neutral-500">Welcome to your admin dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-500 mb-1">Total Posts</p>
              <h3 className="text-3xl font-bold">{loading ? '...' : totalPosts}</h3>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/blog-posts" className="text-primary-600 text-sm font-medium hover:underline">
              View All Posts
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-500 mb-1">Published Posts</p>
              <h3 className="text-3xl font-bold">{loading ? '...' : publishedPosts}</h3>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/blog" className="text-primary-600 text-sm font-medium hover:underline">
              View Public Blog
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-500 mb-1">Draft Posts</p>
              <h3 className="text-3xl font-bold">{loading ? '...' : draftPosts}</h3>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <Edit className="h-6 w-6 text-warning-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/blog-posts/create" className="text-primary-600 text-sm font-medium hover:underline">
              Create New Post
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Posts</h2>
          <Link to="/admin/blog-posts" className="text-primary-600 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">
                        <time dateTime={post.created_at}>
                          {formatDate(post.created_at)}
                        </time>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/blog-posts/edit/${post.id}`}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-500 mb-4">No blog posts yet</p>
            <Link to="/admin/blog-posts/create" className="btn btn-primary">
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/blog-posts/create"
            className="flex items-center justify-center p-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            <span>Create New Post</span>
          </Link>
          
          <Link
            to="/admin/testimonials"
            className="flex items-center justify-center p-4 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            <span>Manage Testimonials</span>
          </Link>
          
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            <span>Schedule Appointments</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;