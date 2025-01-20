"use client";

import { login } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/game-settings`,
      },
    });
  };

  return (
    <form className='space-y-4'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 dark:text-white'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mt-1 block w-full px-3 py-2 bg-white dark:bg-emerald-700/50 border border-gray-300 dark:border-emerald-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
          required
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700 dark:text-white'
        >
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mt-1 block w-full px-3 py-2 bg-white dark:bg-emerald-700/50 border border-gray-300 dark:border-emerald-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
          required
        />
      </div>
      <div>
        <button
          disabled={loading}
          formAction={login}
          className='cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
        >
          Sign In
        </button>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300 dark:border-emerald-600'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-white dark:bg-emerald-800 text-gray-500 dark:text-white'>
            Or continue with
          </span>
        </div>
      </div>
      <div>
        <button
          disabled={loading}
          type='button'
          onClick={handleGoogleSignIn}
          className='cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-emerald-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-emerald-700/50 hover:bg-gray-50 dark:hover:bg-emerald-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
        >
          <FcGoogle className='w-5 h-5 mr-2' />
          Sign in with Google
        </button>
      </div>
    </form>
  );
}
