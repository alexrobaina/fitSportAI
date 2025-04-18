import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function DashboardScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Workout Plan" />
        <Card.Actions>
          <Button onPress={() => navigation.navigate('WorkoutPlan')}>
            View
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Nutrition Plan" />
        <Card.Actions>
          <Button onPress={() => navigation.navigate('NutritionPlan')}>
            View
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Progress Tracker" />
        <Card.Actions>
          <Button onPress={() => navigation.navigate('ProgressTracker')}>
            View
          </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginVertical: 10 },
})
