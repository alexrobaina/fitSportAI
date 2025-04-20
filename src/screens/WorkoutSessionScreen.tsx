import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button, Text, Title, ProgressBar, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Exercise } from '../components/common/ExerciseCard'

const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Finger Pull-Ups',
    image: 'https://cdn.fitclimbai.com/exercises/finger-pullups.png',
    sets: 3,
    reps: 10,
    rest: '60s',
    targetMuscle: 'Forearms',
    equipment: 'Fingerboard',
  },
  {
    id: 'ex2',
    name: 'Wall Sit',
    image: 'https://cdn.fitclimbai.com/exercises/wallsit.png',
    sets: 3,
    reps: '45 sec',
    rest: '45s',
    targetMuscle: 'Quads',
  },
]

export default function WorkoutSessionScreen() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedSets, setCompletedSets] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTimeLeft, setRestTimeLeft] = useState(0)

  const exercise = mockExercises[currentIndex]
  const restDuration = parseInt(exercise.rest.replace(/[^0-9]/g, ''), 10) || 60

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isResting && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (isResting && restTimeLeft <= 0) {
      setIsResting(false)
    }

    return () => clearInterval(interval)
  }, [isResting, restTimeLeft])

  const handleNext = () => {
    if (currentIndex === mockExercises.length - 1) {
      navigation.navigate('WorkoutSummary')
    } else {
      setCurrentIndex(currentIndex + 1)
      setCompletedSets(0)
    }
  }

  const handleCompleteSet = () => {
    if (completedSets < exercise.sets - 1) {
      setCompletedSets(completedSets + 1)
      setRestTimeLeft(restDuration)
      setIsResting(true)
    } else {
      handleNext()
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{exercise.name}</Title>

      <Image source={{ uri: exercise.image }} style={styles.image} />

      <Text style={styles.info}>🎯 Target: {exercise.targetMuscle}</Text>
      <Text style={styles.info}>🔁 Reps: {exercise.reps}</Text>
      <Text style={styles.info}>⏱️ Rest: {exercise.rest}</Text>
      {exercise.equipment && (
        <Text style={styles.info}>🧰 Equipment: {exercise.equipment}</Text>
      )}

      <View style={styles.progressSection}>
        <Text style={styles.progressLabel}>
          Set {completedSets + 1} of {exercise.sets}
        </Text>
        <ProgressBar
          progress={(completedSets + 1) / exercise.sets}
          color={theme.colors.primary}
          style={styles.progressBar}
        />
      </View>

      {isResting ? (
        <>
          <Text style={styles.restText}>⏱️ Rest Time: {restTimeLeft}s</Text>
          <Button
            mode="outlined"
            onPress={() => setIsResting(false)}
            style={styles.button}
          >
            Skip Rest
          </Button>
        </>
      ) : (
        <Button
          mode="contained"
          onPress={handleCompleteSet}
          style={styles.button}
        >
          {completedSets + 1 === exercise.sets
            ? 'Next Exercise'
            : 'Complete Set'}
        </Button>
      )}

      {currentIndex < mockExercises.length - 1 && !isResting && (
        <Button mode="text" onPress={handleNext} style={styles.skipButton}>
          Skip to Next
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  info: {
    marginBottom: 6,
    fontSize: 16,
  },
  progressSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  progressLabel: {
    marginBottom: 4,
    fontWeight: '600',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 6,
  },
  restText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  skipButton: {
    marginTop: 10,
  },
})
