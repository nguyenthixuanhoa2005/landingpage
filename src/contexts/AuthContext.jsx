import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { isSupabaseReady, supabase } from "../lib/supabase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let subscription

    async function initAuth() {
      if (!isSupabaseReady) {
        setLoading(false)
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
        setUser(newSession?.user ?? null)
      })

      subscription = data.subscription
      setLoading(false)
    }

    initAuth()

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const register = async (email, password) => {
    if (!isSupabaseReady) {
      return { error: { message: "Supabase chưa được cấu hình." } }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    return { error }
  }

  const login = async (email, password) => {
    if (!isSupabaseReady) {
      return { error: { message: "Supabase chưa được cấu hình." } }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { error }
  }

  const logout = async () => {
    if (!isSupabaseReady) {
      return
    }

    await supabase.auth.signOut()
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isSupabaseReady,
      register,
      login,
      logout,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
