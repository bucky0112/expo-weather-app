import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-black'>
      <Text className='text-white text-xl'>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  )
}