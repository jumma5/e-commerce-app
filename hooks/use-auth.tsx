"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: Omit<User, "password"> | null
  login: (email: string, password: string) => { success: boolean; error?: string }
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("tuh-user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem("tuh-user")
      }
    }
  }, [])

  const login = (email: string, password: string) => {
    const usersRaw = localStorage.getItem("tuh-users")
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : []
    const found = users.find((u) => u.email === email && u.password === password)
    if (found) {
      const userData = { name: found.name, email: found.email }
      setUser(userData)
      localStorage.setItem("tuh-user", JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: "invalidCredentials" }
  }

  const signup = (name: string, email: string, password: string) => {
    const usersRaw = localStorage.getItem("tuh-users")
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : []
    const exists = users.find((u) => u.email === email)
    if (exists) {
      return { success: false, error: "emailExists" }
    }
    users.push({ name, email, password })
    localStorage.setItem("tuh-users", JSON.stringify(users))
    const userData = { name, email }
    setUser(userData)
    localStorage.setItem("tuh-user", JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("tuh-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
