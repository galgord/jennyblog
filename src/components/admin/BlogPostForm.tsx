import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Database } from '../../lib/database.types';
import { generateSlug } from '../../lib/utils';

type BlogPost = Omit<Database['public']['Tables']['blog_posts']['Insert'], 'id' | 'created_at' | 'updated_at'>;

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
  onSubmit: (data: BlogPost) => Promise<void>;
  isLoading: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BlogPost>({
    defaultValues: initialData || {
      title: '',
      content: '',
      excerpt: '',
      slug: '',
      published: false,
      featured_image_url: '',
      category: '',
      tags: [],
    }
  });
  
  const [tagsInput, setTagsInput] = useState('');
  
  const title = watch('title');
  
  // Update slug when title changes
  React.useEffect(() => {
    if (title && !initialData?.slug) {
      setValue('slug', generateSlug(title));
    }
  }, [title, setValue, initialData?.slug]);
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };
  
  const addTags = () => {
    if (tagsInput.trim()) {
      const newTags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
      const currentTags = watch('tags') || [];
      setValue('tags', [...new Set([...currentTags, ...newTags])]);
      setTagsInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    const currentTags = watch('tags') || [];
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              {...register('title', { required: 'Title is required' })}
              className="form-input"
            />
            {errors.title && <p className="form-error">{errors.title.message}</p>}
          </div>
          
          <div>
            <label htmlFor="slug" className="form-label">Slug</label>
            <input
              id="slug"
              {...register('slug', { required: 'Slug is required' })}
              className="form-input"
            />
            {errors.slug && <p className="form-error">{errors.slug.message}</p>}
          </div>
          
          <div>
            <label htmlFor="excerpt" className="form-label">Excerpt</label>
            <textarea
              id="excerpt"
              {...register('excerpt', { required: 'Excerpt is required' })}
              rows={3}
              className="form-input"
            />
            {errors.excerpt && <p className="form-error">{errors.excerpt.message}</p>}
          </div>
          
          <div>
            <label htmlFor="category" className="form-label">Category</label>
            <input
              id="category"
              {...register('category')}
              className="form-input"
            />
          </div>
          
          <div>
            <label htmlFor="featured_image_url" className="form-label">Featured Image URL</label>
            <input
              id="featured_image_url"
              {...register('featured_image_url')}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="form-label">Tags</label>
            <div className="flex">
              <input
                value={tagsInput}
                onChange={handleTagsChange}
                className="form-input flex-grow"
                placeholder="Add tags separated by commas"
              />
              <button
                type="button"
                onClick={addTags}
                className="ml-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add
              </button>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {watch('tags')?.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="published"
              type="checkbox"
              {...register('published')}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Publish post
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            {...register('content', { required: 'Content is required' })}
            rows={20}
            className="form-input font-mono"
          />
          {errors.content && <p className="form-error">{errors.content.message}</p>}
          <p className="text-sm text-neutral-500 mt-1">
            Use Markdown syntax for formatting.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => history.back()}
          className="btn btn-outline"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save Post'
          )}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;