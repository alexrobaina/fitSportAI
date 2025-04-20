import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useTheme, Chip } from 'react-native-paper'

export type DayItem = {
  day: string
  trained: boolean
}

type Props = {
  days: DayItem[]
  todayIndex: number
}

export default function DayBar({ days, todayIndex }: Props) {
  const theme = useTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {days.map((item, index) => {
        let color = '#ccc'
        if (index === todayIndex) color = theme.colors.primary
        if (item.trained) color = '#4caf50' // green

        return (
          <Chip
            key={index}
            style={[styles.chip, { backgroundColor: color }]}
            textStyle={{ color: '#fff' }}
          >
            {item.day}
          </Chip>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  chip: {
    marginRight: 8,
    height: 36,
    justifyContent: 'center',
  },
})
