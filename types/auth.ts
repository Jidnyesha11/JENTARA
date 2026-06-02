export interface User {
  id: string
  email: string
  phone?: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin' | 'super_admin'
  is_email_verified: boolean
  is_phone_verified: boolean
  created_at: string
  updated_at: string
}

export interface AuthSession {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
