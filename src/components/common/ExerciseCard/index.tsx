import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'

export type Exercise = {
  id: string
  name: string
  image: string
  sets: number
  reps: number | string
  rest: string
  targetMuscle: string
  equipment?: string
  tempo?: string
}

type Props = {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: Props) {
  const { colors } = useTheme()

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Image source={{ uri: exercise.image }} style={styles.image} />

        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.name}>
            {exercise.name}
          </Text>
          <Text>
            🔁 {exercise.sets} sets x {exercise.reps}
          </Text>
          <Text>🧠 {exercise.targetMuscle}</Text>
          <Text>⏱️ Rest: {exercise.rest}</Text>
          {exercise.equipment && <Text>🧰 {exercise.equipment}</Text>}
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontWeight: 'bold',
  },
})
