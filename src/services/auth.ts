import axios, { AxiosError } from 'axios'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'http://192.168.100.8:3000'

export const login = async (email: string, password: string) => {
  try {
    console.log('Attempting login with:', { email, password })
    console.log('Making API call to:', 'http://192.168.100.8:3000/auth/login')

    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('Login response:', response.data)
    const token = response.data.access_token

    if (!token) {
      throw new Error('No access token received')
    }

    await AsyncStorage.setItem('token', token)
    return token
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    console.error('Login error details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    })

    Alert.alert(
      'Login Failed',
      err.response?.data?.message ||
        'Network error. Please check your connection.',
    )
    return null
  }
}

export const logout = async () => {
  await AsyncStorage.removeItem('token')
}

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      password,
    })

    const token = response.data.access_token

    if (!token) {
      throw new Error('No access token received')
    }

    await AsyncStorage.setItem('token', token)
    return token
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    console.error('Register error:', err)

    Alert.alert(
      'Registration Failed',
      err.response?.data?.message || 'Network error. Please try again later.',
    )
    throw err
  }
}
