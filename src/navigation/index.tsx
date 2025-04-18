import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import WelcomeScreen from '../screens/WelcomeScreen'
import ProfileSetupScreen from '../screens/ProfileSetupScreen'
import DashboardScreen from '../screens/DashboardScreen'
import WorkoutPlanScreen from '../screens/WorkoutPlanScreen'
import NutritionPlanScreen from '../screens/NutritionPlan'
import ProgressTrackerScreen from '../screens/ProgressTrackerScreen'
import SettingsScreen from '../screens/SettingsScreen'
import LoginScreen from '../screens/LoginScreen'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Welcome" component={WelcomeScreen} />
        <Tab.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="WorkoutPlan" component={WorkoutPlanScreen} />
        <Tab.Screen name="NutritionPlan" component={NutritionPlanScreen} />
        <Tab.Screen name="ProgressTracker" component={ProgressTrackerScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
