import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Title, Text, Card } from 'react-native-paper'
import { format } from 'date-fns'
import { useWorkoutStore } from '../store/useWorkoutStore'

export default function ProgressTrackerScreen() {
  const sessions = useWorkoutStore((state) => state.sessions)

  // Sort by date descending
  const sortedSessions = [...sessions].sort((a, b) =>
    b.date.localeCompare(a.date),
  )

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Your Progress</Title>

      {sortedSessions.length === 0 && (
        <Text style={styles.empty}>
          No workouts tracked yet. Start training!
        </Text>
      )}

      {sortedSessions.map((session, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">
              {format(new Date(session.date), 'eeee, MMMM d')}
            </Text>
            <Text>✅ {session.exercises.length} exercises completed</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
  },
  card: {
    marginBottom: 12,
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888',
  },
})
