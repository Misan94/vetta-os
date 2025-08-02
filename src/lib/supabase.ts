import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ugsqdwrnrkfiumuhpjrx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnc3Fkd3JucmtmaXVtdWhwanJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MzA0MzgsImV4cCI6MjA2OTMwNjQzOH0.2Ob2Q541jcDbBEZpOf-i7a3xonnyocOMZPeCnABJ7Mk'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for common database operations
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Helper functions for common operations
export const supabaseHelpers = {
  // Authentication helpers
  auth: {
    signUp: (email: string, password: string) => 
      supabase.auth.signUp({ email, password }),
    
    signIn: (email: string, password: string) => 
      supabase.auth.signInWithPassword({ email, password }),
    
    signOut: () => supabase.auth.signOut(),
    
    getUser: () => supabase.auth.getUser(),
    
    onAuthStateChange: (callback: (event: string, session: any) => void) =>
      supabase.auth.onAuthStateChange(callback)
  },

  // Database helpers
  db: {
    // Generic select function
    select: <T>(table: string, columns = '*') => 
      supabase.from(table).select(columns) as any,
    
    // Generic insert function
    insert: <T>(table: string, data: T) => 
      supabase.from(table).insert(data),
    
    // Generic update function
    update: <T>(table: string, data: Partial<T>) => 
      supabase.from(table).update(data),
    
    // Generic delete function
    delete: (table: string) => 
      supabase.from(table).delete()
  }
}