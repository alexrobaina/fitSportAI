import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Title, Text, Divider, Button } from 'react-native-paper'
import { format } from 'date-fns'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Components
import DayBar, { DayItem } from '../components/common/DayBar'
import WorkoutSummaryCard from '../components/common/WorkoutSummaryCard'
import ExerciseCard, { Exercise } from '../components/common/ExerciseCard'
import { useNavigation } from '@react-navigation/native'

export default function WorkoutPlanScreen() {
  const navigation = useNavigation()

  const today = format(new Date(), 'eeee, MMMM d')

  const dayData: DayItem[] = [
    { day: 'Mon', trained: true },
    { day: 'Tue', trained: false },
    { day: 'Wed', trained: true },
    { day: 'Thu', trained: false },
    { day: 'Fri', trained: false },
    { day: 'Sat', trained: false },
    { day: 'Sun', trained: false },
  ]

  const summary =
    'Today’s training will improve your grip and core stability for overhang climbing routes.'
  const tip =
    'Focus on controlled tempo. Avoid rushing your pull-ups – quality over quantity.'

  const exercises: Exercise[] = [
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
    {
      id: 'ex3',
      name: 'Plank to Push-Up',
      image: 'https://cdn.fitclimbai.com/exercises/planktopushup.png',
      sets: 3,
      reps: 15,
      rest: '60s',
      targetMuscle: 'Core',
      equipment: 'Mat',
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Your Workout Plan</Title>
      <Text style={styles.date}>{today}</Text>

      <DayBar days={dayData} todayIndex={new Date().getDay() - 1} />

      <WorkoutSummaryCard summary={summary} tip={tip} />

      <Divider style={{ marginVertical: 20 }} />

      <Title style={styles.sectionTitle}>Exercises</Title>
      {exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} />
      ))}

      <Button
        mode="contained"
        icon={({ size, color }) => (
          <MaterialCommunityIcons
            name="play-circle"
            size={size}
            color={color}
          />
        )}
        style={styles.startButton}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        onPress={() => navigation.navigate('WorkoutSession')}
      >
        Start Training
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
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  startButton: {
    marginTop: 24,
    marginBottom: 40,
    alignSelf: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    width: '90%',
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
