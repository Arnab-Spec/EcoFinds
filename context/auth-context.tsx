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

type UserWithPassword = User & {
  password: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  isLoading: boolean
  validatePassword: (password: string) => { valid: boolean; message: string }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Initial demo user
const INITIAL_USERS: UserWithPassword[] = [
  {
    id: "1",
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
  },
]

// Local storage keys
const USERS_STORAGE_KEY = "ecofinds-users"
const CURRENT_USER_STORAGE_KEY = "ecofinds-user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<UserWithPassword[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Initialize users and current user from localStorage
  useEffect(() => {
    try {
      // Initialize users
      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY)
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers))
      } else {
        // If no users exist in localStorage, initialize with demo user
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS))
        setUsers(INITIAL_USERS)
      }

      // Check for saved user in localStorage
      const savedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY)
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Error initializing auth data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long" }
    }
    return { valid: true, message: "" }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check password length
      const passwordCheck = validatePassword(password)
      if (!passwordCheck.valid) {
        throw new Error(passwordCheck.message)
      }

      // Find user in our local database
      const foundUser = users.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid credentials")
      }

      // Create a user object without the password
      const { password: _, ...userWithoutPassword } = foundUser

      // Update state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userWithoutPassword))

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

      // Check password length
      const passwordCheck = validatePassword(password)
      if (!passwordCheck.valid) {
        throw new Error(passwordCheck.message)
      }

      // Check if user already exists
      if (users.some((u) => u.email === email)) {
        throw new Error("User with this email already exists")
      }

      // Create new user with a unique ID
      const newUser = {
        id: String(Date.now()), // Use timestamp for unique ID
        username,
        email,
      }

      // Create user with password for storage
      const newUserWithPassword = { ...newUser, password }

      // Update users array
      const updatedUsers = [...users, newUserWithPassword]
      setUsers(updatedUsers)

      // Save to localStorage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers))
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser))

      // Update current user
      setUser(newUser)

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
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return

    // Update current user
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(updatedUser))

    // Update in users array
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, ...data }
      }
      return u
    })

    // Save updated users to localStorage
    setUsers(updatedUsers)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers))

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
        validatePassword,
      }}
    >
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
