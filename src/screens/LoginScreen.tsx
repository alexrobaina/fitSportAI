import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { Button, Title, Paragraph, useTheme, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleGoogleLogin = () => {
    console.log('Google login pressed')
    navigation.navigate('MainTabs')
  }

  const handleFacebookLogin = () => {
    console.log('Facebook login pressed')
    navigation.navigate('MainTabs')
  }

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
            Log in to get personalized workouts and nutrition guidance
          </Paragraph>

          <Button
            icon="google"
            mode="contained"
            onPress={handleGoogleLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
            uppercase={false}
          >
            Continue with Google
          </Button>

          <Divider style={styles.divider} />

          <Button
            icon="facebook"
            mode="contained"
            buttonColor="#3b5998"
            onPress={handleFacebookLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
            uppercase={false}
          >
            Continue with Facebook
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
    marginBottom: 30,
    color: '#777',
  },
  button: {
    width: '100%',
    marginVertical: 6,
    borderRadius: 6,
  },
  buttonContent: {
    height: 48,
  },
  divider: {
    marginVertical: 10,
    width: '80%',
  },
})
