import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const AdminTestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    testimonial: '',
    image_url: '',
    published: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setTestimonials(data || []);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ published: !currentStatus })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial.id === id 
            ? { ...testimonial, published: !currentStatus } 
            : testimonial
        )
      );
    } catch (err) {
      console.error('Error toggling testimonial status:', err);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      testimonial: testimonial.testimonial,
      image_url: testimonial.image_url || '',
      published: testimonial.published,
    });
    setEditingId(testimonial.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', id);
          
        if (error) {
          throw error;
        }
        
        setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
      } catch (err) {
        console.error('Error deleting testimonial:', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (editingId) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: formData.name,
            testimonial: formData.testimonial,
            image_url: formData.image_url || null,
            published: formData.published,
          })
          .eq('id', editingId);
          
        if (error) throw error;
      } else {
        // Create new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert({
            name: formData.name,
            testimonial: formData.testimonial,
            image_url: formData.image_url || null,
            published: formData.published,
          });
          
        if (error) throw error;
      }
      
      // Reset form and refresh data
      setFormData({
        name: '',
        testimonial: '',
        image_url: '',
        published: true,
      });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error('Error saving testimonial:', err);
      setError('Failed to save testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      testimonial: '',
      image_url: '',
      published: true,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <p className="text-neutral-500">Manage testimonials from your clients</p>
      </div>
      
      {/* Testimonial Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h2>
        
        {error && (
          <div className="bg-error-100 text-error-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="form-label">Client Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="image_url" className="form-label">Profile Image URL (Optional)</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="testimonial" className="form-label">Testimonial</label>
            <textarea
              id="testimonial"
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              rows={4}
              className="form-input"
              required
            ></textarea>
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={e => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Published
            </label>
          </div>
          
          <div className="flex justify-end space-x-4">
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="btn btn-outline"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                editingId ? 'Update Testimonial' : 'Add Testimonial'
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Testimonials List */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
        <h2 className="p-6 border-b border-neutral-200 text-xl font-semibold">
          All Testimonials
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="divide-y divide-neutral-200">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-neutral-200 mr-3">
                      {testimonial.image_url ? (
                        <img 
                          src={testimonial.image_url} 
                          alt={testimonial.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-neutral-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      testimonial.published 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {testimonial.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                
                <p className="text-neutral-700 mb-4">{testimonial.testimonial}</p>
                
                <div className="flex justify-end space-x-3 text-sm">
                  <button
                    onClick={() => handleTogglePublished(testimonial.id, testimonial.published)}
                    className={`font-medium ${
                      testimonial.published 
                        ? 'text-neutral-600 hover:text-neutral-800' 
                        : 'text-success-600 hover:text-success-800'
                    }`}
                  >
                    {testimonial.published ? 'Unpublish' : 'Publish'}
                  </button>
                  
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="font-medium text-primary-600 hover:text-primary-800"
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="font-medium text-error-600 hover:text-error-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-500">No testimonials yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;