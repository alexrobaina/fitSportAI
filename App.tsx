import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { registerRootComponent } from 'expo'
import Navigation from './src/navigation'

registerRootComponent(App)

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  )
}
