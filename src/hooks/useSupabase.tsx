import { useState, useEffect } from 'react'
import { supabase, supabaseHelpers } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

// Hook for authentication state
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    session,
    loading,
    signIn: supabaseHelpers.auth.signIn,
    signUp: supabaseHelpers.auth.signUp,
    signOut: supabaseHelpers.auth.signOut,
  }
}

// Hook for database operations with loading states
export function useSupabaseQuery<T = any>(
  table: string,
  options?: {
    select?: string
    filter?: (query: any) => any
    dependencies?: any[]
  }
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from(table).select(options?.select || '*')
      
      // Apply filters if provided
      if (options?.filter) {
        query = options.filter(query)
      }

      const { data: result, error: queryError } = await query

      if (queryError) {
        throw queryError
      }

      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, options?.dependencies || [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

// Hook for mutations (insert, update, delete)
export function useSupabaseMutation<T = any>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const insert = async (data: T | T[]) => {
    try {
      setLoading(true)
      setError(null)

      console.log('Attempting to insert into table:', table, 'with data:', data)

      const { data: result, error: insertError } = await supabase
        .from(table)
        .insert(data)
        .select()

      if (insertError) {
        console.error('Supabase insert error:', insertError)
        throw insertError
      }

      console.log('Insert successful:', result)
      return { data: result, error: null }
    } catch (err) {
      console.error('Insert caught error:', err)
      let errorMessage = 'Insert failed'
      
      if (err && typeof err === 'object') {
        if ('message' in err) {
          errorMessage = err.message as string
        } else if ('error' in err) {
          errorMessage = (err as any).error
        } else if ('details' in err) {
          errorMessage = (err as any).details
        }
      } else if (typeof err === 'string') {
        errorMessage = err
      }
      
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const update = async (data: Partial<T>, filter: (query: any) => any) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from(table).update(data)
      query = filter(query)

      const { data: result, error: updateError } = await query.select()

      if (updateError) {
        throw updateError
      }

      return { data: result, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const remove = async (filter: (query: any) => any) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from(table).delete()
      query = filter(query)

      const { error: deleteError } = await query

      if (deleteError) {
        throw deleteError
      }

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed'
      setError(errorMessage)
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    insert,
    update,
    remove,
    loading,
    error,
  }
}