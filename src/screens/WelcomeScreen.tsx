import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Title, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Title>Welcome to FitClimb AI</Title>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ProfileSetup')}
      >
        Get Started
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
})
