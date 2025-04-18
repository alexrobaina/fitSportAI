import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function DashboardScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Title>Dashboard</Title>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginVertical: 10 },
})
