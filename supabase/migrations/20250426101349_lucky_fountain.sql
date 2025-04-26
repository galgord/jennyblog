/*
  # Initial schema for Jenny Gordon's blog

  1. New Tables
    - `blog_posts` - Stores all blog posts
    - `profiles` - Stores user profile information
    - `testimonials` - Stores client testimonials
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public access to published content
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT false,
  featured_image_url text,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category text,
  tags text[]
);

-- Create profiles table for users
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  website text
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  testimonial text NOT NULL,
  image_url text,
  published boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
-- Authenticated users can create posts
CREATE POLICY "Users can create their own posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Authenticated users can update their own posts
CREATE POLICY "Users can update their own posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Authenticated users can delete their own posts
CREATE POLICY "Users can delete their own posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Authenticated users can read all posts
CREATE POLICY "Authenticated users can read all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Anonymous users can read published posts
CREATE POLICY "Public users can read published posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Profiles Policies
-- Users can read all profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  TO public
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Testimonials Policies
-- Authenticated users have full control over testimonials
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Anonymous users can only read published testimonials
CREATE POLICY "Public users can read published testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (published = true);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();