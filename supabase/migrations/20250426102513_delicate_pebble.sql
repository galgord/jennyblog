/*
  # Create initial admin user

  1. Changes
    - Creates the initial admin user account for Jenny Gordon
    - Email: jennygordon@gmail.com
    - Password: IloveMyMom!
*/

-- Create the admin user using Supabase's auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'jennygordon@gmail.com',
  crypt('IloveMyMom!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create the corresponding profile
INSERT INTO public.profiles (
  id,
  full_name,
  avatar_url,
  bio,
  website
)
SELECT 
  id,
  'Jenny Gordon',
  NULL,
  'Trigeminal Neuralgia Coach and Mentor',
  NULL
FROM auth.users
WHERE email = 'jennygordon@gmail.com';