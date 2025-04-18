import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Screens
import LoginScreen from '../screens/LoginScreen'
import ProfileSetupScreen from '../screens/ProfileSetupScreen'
import DashboardScreen from '../screens/DashboardScreen'
import WorkoutPlanScreen from '../screens/WorkoutPlanScreen'
import NutritionPlanScreen from '../screens/NutritionPlanScreen'
import ProgressTrackerScreen from '../screens/ProgressTrackerScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196f3',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutPlanScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="arm-flex" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionPlanScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressTrackerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
