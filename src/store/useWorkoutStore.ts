import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ExerciseRecord = {
  id: string
  name: string
  completedSets: number
  totalSets: number
  completedAt: string
}

type WorkoutSession = {
  date: string
  exercises: ExerciseRecord[]
}

type WorkoutState = {
  sessions: WorkoutSession[]
  notes: Record<string, string>
  addCompletedExercise: (exercise: ExerciseRecord) => void
  saveNote: (date: string, note: string) => void
  clearSession: () => void
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      sessions: [],
      notes: {},
      addCompletedExercise: (exercise) => {
        const today = new Date().toISOString().split('T')[0]
        set((state) => {
          const existing = state.sessions.find((s) => s.date === today)
          if (existing) {
            return {
              sessions: state.sessions.map((s) =>
                s.date === today
                  ? { ...s, exercises: [...s.exercises, exercise] }
                  : s,
              ),
            }
          } else {
            return {
              sessions: [
                ...state.sessions,
                { date: today, exercises: [exercise] },
              ],
            }
          }
        })
      },
      saveNote: (date, note) =>
        set((state) => ({
          notes: { ...state.notes, [date]: note },
        })),
      clearSession: () => set({ sessions: [], notes: {} }),
    }),
    {
      name: 'fitclimbai-storage',
      storage: AsyncStorage,
    },
  ),
)
