import React, { useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  Title,
  HelperText,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Dropdown, MultiSelectDropdown } from 'react-native-paper-dropdown'

type RootStackParamList = {
  Login: undefined
  ProfileSetup: undefined
  MainTabs: undefined
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileSetup'
>

type FormValues = {
  age: string
  weight: string
  sport: string[] // now an array
  goal: string
}

// Single‑select options (training frequency)
const goalOptions = [
  { label: '1 day per week', value: '1' },
  { label: '2 days per week', value: '2' },
  { label: '3 days per week', value: '3' },
  { label: '4 days per week', value: '4' },
  { label: '5 days per week', value: '5' },
  { label: '6 days per week', value: '6' },
  { label: 'Every day', value: '7' },
]

// Multi‑select options (sports)
const sportOptions = [
  { label: 'Gym', value: 'gym' },
  { label: 'Calisthenics', value: 'calisthenic' },
  { label: 'Climb', value: 'climb' },
  { label: 'High Mountain', value: 'high_mountain' },
  { label: 'Trekking', value: 'trekking' },
  { label: 'Running', value: 'running' },
  { label: 'Paragliding', value: 'paraglide' },
]

// Validation schema
const ProfileSchema = Yup.object().shape({
  age: Yup.number().required('Age is required').positive().integer(),
  weight: Yup.number().required('Weight is required').positive(),
  sport: Yup.array()
    .min(1, 'Select at least one sport')
    .required('Sport is required'),
  goal: Yup.string().required('Goal is required'),
})

export default function ProfileSetupScreen() {
  const navigation = useNavigation<NavigationProp>()
  const [showGoalDropDown, setShowGoalDropDown] = useState(false)
  const [showSportDropDown, setShowSportDropDown] = useState(false)

  const handleSubmit = (values: FormValues) => {
    console.log('Profile Submitted:', values)
    navigation.navigate('MainTabs')
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scroll}>
            <Title style={styles.title}>Set Up Your Profile</Title>

            <Formik
              initialValues={{
                age: '',
                weight: '',
                sport: [],
                goal: '',
              }}
              validationSchema={ProfileSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isValid,
                setFieldValue,
              }) => (
                <View>
                  {/* Age */}
                  <TextInput
                    label="Age"
                    value={values.age}
                    onChangeText={handleChange('age')}
                    onBlur={handleBlur('age')}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <HelperText
                    type="error"
                    visible={!!touched.age && !!errors.age}
                  >
                    {errors.age}
                  </HelperText>

                  {/* Weight */}
                  <TextInput
                    label="Weight (kg)"
                    value={values.weight}
                    onChangeText={handleChange('weight')}
                    onBlur={handleBlur('weight')}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <HelperText
                    type="error"
                    visible={!!touched.weight && !!errors.weight}
                  >
                    {errors.weight}
                  </HelperText>

                  {/* Multi‑Select Sport */}
                  <View style={styles.dropdownContainer}>
                    <MultiSelectDropdown
                      label="Select Sports"
                      mode="outlined"
                      options={sportOptions}
                      value={values.sport}
                      onSelect={(list) => setFieldValue('sport', list)}
                    />
                  </View>
                  <HelperText
                    type="error"
                    visible={!!touched.sport && !!errors.sport}
                  >
                    {Array.isArray(errors.sport)
                      ? errors.sport[0]
                      : errors.sport}
                  </HelperText>

                  {/* Single‑Select Goal */}
                  <View style={styles.dropdownContainer}>
                    <Dropdown
                      label="Training Frequency"
                      mode="outlined"
                      options={goalOptions}
                      value={values.goal}
                      onSelect={(val) => setFieldValue('goal', val)}
                    />
                  </View>
                  <HelperText
                    type="error"
                    visible={!!touched.goal && !!errors.goal}
                  >
                    {errors.goal}
                  </HelperText>

                  <Button
                    mode="contained"
                    onPress={() => handleSubmit(values)}
                    style={styles.button}
                    disabled={!isValid}
                  >
                    Continue to Dashboard
                  </Button>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 24 },
  scroll: { paddingVertical: 30 },
  title: { marginBottom: 20, textAlign: 'center', fontSize: 24 },
  input: { marginBottom: 4 },
  button: { marginTop: 20, borderRadius: 6, paddingVertical: 6 },
  dropdownContainer: {
    marginBottom: 12,
    ...Platform.select({ ios: { zIndex: 1000 } }),
  },
})
