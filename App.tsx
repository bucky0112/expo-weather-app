import { useEffect } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

export default function App() {
  const apiUrl = process.env.EXPO_PUBLIC_WEATHER_API_URL
  const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${apiKey}`
      )
      const json = await response.json()
      // return json
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-blue-500'>
      <StatusBar style='auto' />
      <View className='items-center p-6 space-y-4 w-500'>
        <Text className='text-2xl font-semibold text-white'>Taipei</Text>
        <Text className='text-sm text-gray-200'>Monday, 12 September</Text>
        <View className='items-center space-y-2'>
          <AntDesign name='cloudo' size={60} color='#ded8d8' />
          <Text className='text-6xl font-bold text-white'>28°</Text>
          <Text className='text-xl text-gray-300'>Partly Cloudy</Text>
        </View>
      </View>
      <View className='flex-row overflow-x-auto space-x-6 p-6 w-500 mx-auto'>
        <View className='items-center space-y-2'>
          <Text className='text-sm font-medium text-white'>4 PM</Text>
          <AntDesign name='cloudo' size={30} color='#ded8d8' />
          <Text className='text-lg font-semibold text-white'>28°</Text>
        </View>
        <View className='items-center space-y-2'>
          <Text className='text-sm font-medium text-white'>5 PM</Text>
          <Feather name='sun' size={30} color='#fbe756' />
          <Text className='text-lg font-semibold text-white'>26°</Text>
        </View>
        <View className='items-center space-y-2'>
          <Text className='text-sm font-medium text-white'>6 PM</Text>
          <Feather name='cloud-rain' size={30} color='#dcd6d6' />
          <Text className='text-lg font-semibold text-white'>26°</Text>
        </View>
        <View className='items-center space-y-2'>
          <Text className='text-sm font-medium text-white'>7 PM</Text>
          <Ionicons name='thunderstorm-outline' size={28} color='#f5f9f9' />
          <Text className='text-lg font-semibold text-white'>25°</Text>
        </View>
      </View>
      <View className='space-y-6 p-6'>
        <View className='flex-row justify-around items-center mb-8 mr-4'>
          <Text className='text-lg font-medium text-white w-28'>Tuesday</Text>
          <AntDesign name='cloudo' size={30} color='#ded8d8' />
          <Text className='text-lg font-semibold text-white w-24'>
            73° / 60°
          </Text>
        </View>
        <View className='flex-row justify-around items-center mb-8 mr-4'>
          <Text className='text-lg font-medium text-white w-28'>Wednesday</Text>
          <AntDesign name='cloudo' size={30} color='#ded8d8' />
          <Text className='text-lg font-semibold text-white w-24'>
            76° / 62°
          </Text>
        </View>
        <View className='flex-row justify-around items-center mb-8 mr-4'>
          <Text className='text-lg font-medium text-white w-28'>Thursday</Text>
          <AntDesign name='cloudo' size={30} color='#ded8d8' />
          <Text className='text-lg font-semibold text-white w-24'>
            70° / 57°
          </Text>
        </View>
        <View className='flex-row justify-around items-center mb-8 mr-4'>
          <Text className='text-lg font-medium text-white w-28'>Friday</Text>
          <AntDesign name='cloudo' size={30} color='#ded8d8' />
          <Text className='text-lg font-semibold text-white w-24'>
            70° / 57°
          </Text>
        </View>
        <View className='flex-row justify-around items-center mb-8 mr-4'>
          <Text className='text-lg font-medium text-white w-28'>Saturday</Text>
          <AntDesign name='cloudo' size={30} color='#ded8d8' />
          <Text className='text-lg font-semibold text-white w-24'>
            76° / 62°
          </Text>
        </View>
        <View className='flex-row justify-around items-center mb-8 mr-4'>
          <Text className='text-lg font-medium text-white w-28'>Sunday</Text>
          <AntDesign name='cloudo' size={30} color='#ded8d8' />
          <Text className='text-lg font-semibold text-white w-24'>
            70° / 57°
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
