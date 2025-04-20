import { StyleSheet, ScrollView } from 'react-native'
import { Title, Text, Card, Button } from 'react-native-paper'
import { format } from 'date-fns'
import { TextInput } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { useWorkoutStore } from '../../../store/useWorkoutStore'
import { useNavigation } from '@react-navigation/native'
import WorkoutMetricsCard from '../WorkoutMetricsCard'

export default function WorkoutSummaryScreen() {
  const navigation = useNavigation()

  const today = new Date().toISOString().split('T')[0]
  const sessions = useWorkoutStore((state) => state.sessions)
  const clearSession = useWorkoutStore((state) => state.clearSession)

  const todaySession = sessions.find((s) => s.date === today)
  const allExercises = todaySession?.exercises || []

  const totalSets = allExercises.reduce((sum, ex) => sum + ex.completedSets, 0)
  const estimatedCalories = totalSets * 5 // ~5 kcal per set
  const estimatedMinutes = Math.round(totalSets * 1.5) // ~1.5 min per set
  const totalExercises = allExercises.length
  const mockMuscles = ['Forearms', 'Core', 'Legs']
  const [note, setNote] = useState('')
  const notes = useWorkoutStore((state) => state.notes)

  const saveNote = useWorkoutStore((state) => state.saveNote)

  useEffect(() => {
    if (notes[today]) setNote(notes[today])
  }, [notes, today])

  const handleFinish = () => {
    clearSession()
    navigation.navigate('MainTabs', { screen: 'Dashboard' })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Workout Summary</Title>
      <Text style={styles.date}>{format(new Date(), 'eeee, MMMM d')}</Text>

      {todaySession && (
        <WorkoutMetricsCard
          totalSets={totalSets}
          estimatedCalories={estimatedCalories}
          estimatedMinutes={estimatedMinutes}
          totalExercises={totalExercises}
          muscleGroups={mockMuscles}
        />
      )}

      {todaySession ? (
        todaySession.exercises.map((exercise, idx) => (
          <Card key={idx} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{exercise.name}</Text>
              <Text>✅ {exercise.completedSets} sets completed</Text>
              <Text>
                🕒 Completed at:{' '}
                {format(new Date(exercise.completedAt), 'HH:mm')}
              </Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text style={{ marginTop: 20 }}>No exercises logged today.</Text>
      )}

      <Button mode="contained" style={styles.button} onPress={handleFinish}>
        Finish Session
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
  },
  date: {
    color: '#777',
    marginBottom: 20,
  },
  card: {
    marginBottom: 12,
  },
  button: {
    marginTop: 30,
    borderRadius: 8,
  },
  noteLabel: {
    marginTop: 30,
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#fff',
  },
})
