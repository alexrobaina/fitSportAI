import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'

export default function SettingsScreen() {
  const navigation = useNavigation()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigation.navigate('Login' as never)
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Settings" />
        <Card.Content>
          <Button mode="contained" onPress={handleLogout}>
            Log Out
          </Button>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginVertical: 10 },
})
