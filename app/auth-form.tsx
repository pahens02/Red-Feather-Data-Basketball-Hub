'use client'
import { Auth } from '@supabase/auth-ui-react'
import './globals.css'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'


export default function AuthForm() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);
        if (event === 'SIGNED_IN') {
          router.push('/home');
        }
      }
    );

  }, []);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}
