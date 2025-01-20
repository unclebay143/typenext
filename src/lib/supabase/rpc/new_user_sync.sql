// sync new user to User table since we cannot query auth.users table direcly for user details _internal_resolve
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, displayName)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'displayName');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;