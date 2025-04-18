import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function NutritionPlanScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Workout Plan" />
        <Card.Actions>
          <Title>Nutrition Plan</Title>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginVertical: 10 },
})
