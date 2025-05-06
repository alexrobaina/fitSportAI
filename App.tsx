import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { registerRootComponent } from 'expo'
import Navigation from './src/navigation'
import { AuthProvider } from './src/context/AuthContext'

registerRootComponent(App)

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </PaperProvider>
  )
}
