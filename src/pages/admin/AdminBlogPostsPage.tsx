import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, Trash2, Edit } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../lib/utils';
import { Database } from '../../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const AdminBlogPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPublished, setShowPublished] = useState(true);
  const [showDrafts, setShowDrafts] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (showPublished && !showDrafts) {
      query = query.eq('published', true);
    } else if (!showPublished && showDrafts) {
      query = query.eq('published', false);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [showPublished, showDrafts]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setIsDeleting(true);
      setSelectedPost(id);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      } else {
        setPosts(posts.filter(post => post.id !== id));
      }
      
      setIsDeleting(false);
      setSelectedPost(null);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-neutral-500">Manage your blog content</p>
        </div>
        <Link to="/admin/blog-posts/create" className="btn btn-primary">
          <PlusCircle size={18} className="mr-2" />
          New Post
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 form-input"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="text-neutral-500 mr-2" />
              <span className="text-sm text-neutral-500">Filters:</span>
            </div>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary-600"
                checked={showPublished}
                onChange={() => setShowPublished(!showPublished)}
              />
              <span className="ml-2 text-sm text-neutral-700">Published</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary-600"
                checked={showDrafts}
                onChange={() => setShowDrafts(!showDrafts)}
              />
              <span className="ml-2 text-sm text-neutral-700">Drafts</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{post.title}</div>
                      <div className="text-sm text-neutral-500 truncate max-w-xs">{post.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">
                        <time dateTime={post.created_at}>
                          {formatDate(post.created_at)}
                        </time>
                      </div>
                      {post.updated_at !== post.created_at && (
                        <div className="text-xs text-neutral-400">
                          Updated: {formatDate(post.updated_at)}
                        </div>
                      )}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.category ? (
                        <span className="px-2 py-1 text-xs rounded bg-primary-50 text-primary-700">
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-neutral-400 text-sm">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/blog-posts/edit/${post.id}`}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <Edit size={18} className="inline mb-0.5" />
                        <span className="ml-1">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-error-600 hover:text-error-900 focus:outline-none"
                        disabled={isDeleting && selectedPost === post.id}
                      >
                        {isDeleting && selectedPost === post.id ? (
                          <span>Deleting...</span>
                        ) : (
                          <>
                            <Trash2 size={18} className="inline mb-0.5" />
                            <span className="ml-1">Delete</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">
              {searchTerm
                ? 'No posts match your search criteria'
                : 'No posts available'}
            </p>
            <Link to="/admin/blog-posts/create" className="btn btn-primary">
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogPostsPage;