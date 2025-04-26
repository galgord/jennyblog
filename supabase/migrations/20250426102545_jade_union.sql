/*
  # Create initial admin user

  1. Changes
    - Creates the initial admin user account for Jenny Gordon if it doesn't exist
    - Updates the profile if it already exists
    - Email: jennygordon@gmail.com
    - Password: IloveMyMom!
*/

DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Create the admin user if it doesn't exist
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
  ) 
  SELECT
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
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'jennygordon@gmail.com'
  )
  RETURNING id INTO user_id;

  -- If user already exists, get their ID
  IF user_id IS NULL THEN
    SELECT id INTO user_id FROM auth.users WHERE email = 'jennygordon@gmail.com';
  END IF;

  -- Update or insert the profile
  INSERT INTO public.profiles (
    id,
    full_name,
    avatar_url,
    bio,
    website
  ) 
  VALUES (
    user_id,
    'Jenny Gordon',
    NULL,
    'Trigeminal Neuralgia Coach and Mentor',
    NULL
  )
  ON CONFLICT (id) DO UPDATE 
  SET 
    full_name = 'Jenny Gordon',
    bio = 'Trigeminal Neuralgia Coach and Mentor',
    updated_at = now();
END $$;