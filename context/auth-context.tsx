"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Define types
type User = {
  id: string
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  isLoading: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample user data for demo
const DEMO_USERS = [
  {
    id: "1",
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("ecofinds-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundUser = DEMO_USERS.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid credentials")
      }

      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("ecofinds-user", JSON.stringify(userWithoutPassword))

      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.username}!`,
      })

      router.push("/browse")
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      if (DEMO_USERS.some((u) => u.email === email)) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser = {
        id: String(DEMO_USERS.length + 1),
        username,
        email,
      }

      // In a real app, we would save to database here
      DEMO_USERS.push({ ...newUser, password })

      setUser(newUser)
      localStorage.setItem("ecofinds-user", JSON.stringify(newUser))

      toast({
        title: "Registration successful",
        description: `Welcome to EcoFinds, ${username}!`,
      })

      router.push("/browse")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ecofinds-user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("ecofinds-user", JSON.stringify(updatedUser))

    // Update in demo users array
    const userIndex = DEMO_USERS.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      DEMO_USERS[userIndex] = { ...DEMO_USERS[userIndex], ...data }
    }

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
