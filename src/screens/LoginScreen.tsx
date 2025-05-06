import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import {
  View,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native'
import { Button, Title, Paragraph } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'

export default function LoginScreen() {
  const navigation = useNavigation()
  const { login, userToken, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const success = await login(email, password)
    if (success) {
      navigation.navigate('MainTabs' as never)
    }
  }

  useEffect(() => {
    if (userToken) {
      navigation.navigate('MainTabs' as never)
    }
  }, [userToken])

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Title style={styles.title}>Welcome to FitClimb AI</Title>
          <Paragraph style={styles.subtitle}>
            Enter your credentials to log in
          </Paragraph>

          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Button
            mode="contained"
            loading={isLoading}
            onPress={handleLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Log In
          </Button>

          <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => navigation.navigate('Register' as never)}
          >
            Register
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    marginBottom: 8,
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    marginVertical: 6,
    borderRadius: 6,
  },
  buttonContent: {
    height: 48,
  },
})
