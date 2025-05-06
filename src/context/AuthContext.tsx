// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Alert } from 'react-native'

// Use your actual local IP — NOT localhost
const API_URL = 'http://192.168.100.8:3000'

type AuthContextType = {
  userToken: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load token from storage on mount
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token')
      setUserToken(token)
      setIsLoading(false)
    }
    loadToken()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      })

      const token = response.data.access_token
      if (!token) throw new Error('No token returned')

      await AsyncStorage.setItem('token', token)
      setUserToken(token)
      return true
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      console.error('Login error:', err)
      Alert.alert(
        'Login Failed',
        err.response?.data?.message ||
          'Please check your network or credentials.',
      )
      return false
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    setUserToken(null)
  }

  return (
    <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
