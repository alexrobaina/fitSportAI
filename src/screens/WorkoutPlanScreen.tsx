import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Title,
  Card,
  Text,
  Button,
  useTheme,
  Divider,
} from 'react-native-paper'
import { format } from 'date-fns'

const exercises = [
  {
    name: 'Finger Pull-Ups',
    sets: '3 sets x 10 reps',
    target: 'Forearms',
  },
  {
    name: 'Plank',
    sets: '3 sets x 60 sec',
    target: 'Core',
  },
  {
    name: 'Leg Raises',
    sets: '3 sets x 15 reps',
    target: 'Lower Abs',
  },
]

export default function WorkoutPlanScreen() {
  const { colors } = useTheme()
  const today = format(new Date(), 'eeee, MMMM d')

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Your Workout Plan</Title>
      <Text style={styles.date}>{today}</Text>

      {/* Summary Card */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleMedium">Climbing Strength & Core</Text>
          <Text style={styles.summary}>Estimated time: 35 mins</Text>
          <Text style={styles.summary}>Level: Intermediate</Text>
        </Card.Content>
      </Card>

      {/* Divider */}
      <Divider style={{ marginVertical: 20 }} />

      {/* Exercise List */}
      <Title style={styles.sectionTitle}>Exercises</Title>
      {exercises.map((exercise, idx) => (
        <Card key={idx} style={styles.exerciseCard}>
          <Card.Content>
            <Text variant="titleSmall">{exercise.name}</Text>
            <Text>{exercise.sets}</Text>
            <Text style={{ color: colors.primary }}>{exercise.target}</Text>
          </Card.Content>
        </Card>
      ))}

      {/* Start Button */}
      <Button mode="contained" style={styles.button} onPress={() => {}}>
        Start Workout
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  summary: {
    marginTop: 4,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  exerciseCard: {
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    marginVertical: 30,
    borderRadius: 6,
    paddingVertical: 8,
  },
})
