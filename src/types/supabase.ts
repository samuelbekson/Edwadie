// Supabase types for better type safety
export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  phoneNumber?: string;
  created_at?: string;
  updated_at?: string;
  role?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

export type AuthChangeEvent = 
  | 'INITIAL_SESSION'
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'PASSWORD_RECOVERY'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED';