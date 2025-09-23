import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import type { User, Session, AuthChangeEvent } from '@/types/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (email: string, password: string, phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch the user profile from the database
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  // Handle auth state changes
  useEffect(() => {
    let mounted = true;
    
    // Get initial session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state changed:', event);
        
        if (!mounted) return;
        
        if (session?.user) {
          // Get or create user profile
          let userProfile = await fetchUserProfile(session.user.id);
          
          if (!userProfile) {
            // Create a new profile if it doesn't exist
            const { error } = await supabase
              .from('profiles')
              .upsert({
                id: session.user.id,
                email: session.user.email,
                phone_number: session.user.phone || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                role: 'user',
              });
              
            if (error) {
              console.error('Error creating user profile:', error);
              return;
            }
            
            userProfile = await fetchUserProfile(session.user.id);
          }
          
          if (mounted) {
            setUser(userProfile);
            setSession(session);
          }
        } else {
          if (mounted) {
            setUser(null);
            setSession(null);
          }
        }
        
        if (mounted) {
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && mounted) {
          const userProfile = await fetchUserProfile(session.user.id);
          setUser(userProfile);
          setSession(session);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();
    
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchUserProfile]);

  // Login with email/phone and password
  const login = async (identifier: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Check if identifier is an email or phone number
      const isEmail = identifier.includes('@');
      const credentials = isEmail 
        ? { email: identifier, password }
        : { phone: identifier, password };
      
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      
      if (error) throw error;
      if (!data.session) throw new Error('No session returned');
      
      // Success handling (toast, redirect) is performed by the caller (e.g., Login page).
    } catch (error) {
      console.error('Login error:', error);
      const message = error instanceof Error ? error.message : 'Login failed';
      toast({
        title: "Login Error",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email/phone and password
  const signup = async (email: string, password: string, phoneNumber: string) => {
    try {
      setIsLoading(true);
      
      // First, sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone_number: phoneNumber,
          },
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: 'Account created',
          description: 'Please check your email to verify your account.',
          variant: 'default',
        });
        
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      const message = error instanceof Error ? error.message : 'Signup failed';
      toast({
        title: "Signup Error", 
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout the user
  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
        variant: 'default',
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      const message = error instanceof Error ? error.message : 'Logout failed';
      toast({
        title: "Logout Error",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: 'Password reset email sent',
        description: 'Please check your email for further instructions.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Password reset error:', error);
      const message = error instanceof Error ? error.message : 'Password reset failed';
      toast({
        title: "Password Reset Error",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error('No user is logged in');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local user state
      setUser({ ...user, ...updates });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Profile update error:', error);
      const message = error instanceof Error ? error.message : 'Profile update failed';
      toast({
        title: "Profile Update Error",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
