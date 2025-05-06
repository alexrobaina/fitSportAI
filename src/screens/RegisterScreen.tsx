import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { Button, Title, Paragraph } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { register } from '../services/auth'

export default function RegisterScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      await register(email, password)
      Alert.alert('Success', 'Account created!')
      navigation.navigate('MainTabs' as never)
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Failed to create account')
      navigation.navigate('Login' as never)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Title style={styles.title}>Create an Account</Title>
          <Paragraph style={styles.subtitle}>
            Sign up to start your climbing training
          </Paragraph>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
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
  title: {
    marginBottom: 10,
    fontSize: 24,
  },
  subtitle: {
    marginBottom: 20,
    color: '#777',
    textAlign: 'center',
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
    marginTop: 10,
  },
})
