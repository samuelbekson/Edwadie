import { createClient } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yszjfczmqlsqumnewqrk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzempmY3ptcWxzcXVtbmV3cXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjY0ODAsImV4cCI6MjA2NjgwMjQ4MH0.91RF1WgV45A9nGzzwB99reIbe4gffnfHgXpD3LU0VlA';


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Error handler for Supabase operations
export const handleSupabaseError = (error: any, operation: string) => {
  console.error(`Supabase ${operation} error:`, error);
  
  let message = 'An unexpected error occurred';
  
  if (error?.message) {
    if (error.message.includes('Invalid login credentials')) {
      message = 'Invalid email or password';
    } else if (error.message.includes('Email not confirmed')) {
      message = 'Please verify your email address';
    } else if (error.message.includes('User already registered')) {
      message = 'An account with this email already exists';
    } else {
      message = error.message;
    }
  }
  
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
};