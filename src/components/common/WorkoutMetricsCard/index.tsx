import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'

type Props = {
  totalSets: number
  totalExercises: number
  estimatedCalories: number
  estimatedMinutes: number
  muscleGroups: string[]
}

export default function WorkoutMetricsCard({
  totalSets,
  totalExercises,
  estimatedCalories,
  estimatedMinutes,
  muscleGroups,
}: Props) {
  const { colors } = useTheme()

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Session Summary
        </Text>

        <View style={styles.row}>
          <Text>✅ Sets: {totalSets}</Text>
          <Text>🔥 {estimatedCalories} kcal</Text>
        </View>

        <View style={styles.row}>
          <Text>🕒 Duration: {estimatedMinutes} min</Text>
          <Text>🏋️ Exercises: {totalExercises}</Text>
        </View>

        <Text style={styles.muscleGroups}>
          🎯 Focus: {muscleGroups.join(', ')}
        </Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  muscleGroups: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
  },
})
