import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const CurrentWeather = () => (
  <View className='items-center space-y-2'>
    <AntDesign name='cloudo' size={60} color='#ded8d8' />
    <Text className='text-6xl font-bold text-white'>28°</Text>
    <Text className='text-xl text-gray-300'>Partly Cloudy</Text>
  </View>
)

export default CurrentWeather
