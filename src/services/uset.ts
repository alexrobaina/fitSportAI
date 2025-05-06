import axios from 'axios'

const updateUserProfile = async (
  userId: string,
  sport: string,
  goal: string,
) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/user/${userId}/setup`,
      {
        sport,
        goal,
      },
    )
    console.log('User profile updated:', response.data)
  } catch (error) {
    console.error('Error updating user profile:', error)
  }
}
