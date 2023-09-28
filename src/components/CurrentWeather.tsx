import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useStore from '../store'

const CurrentWeather = () => {
  const { currentWeather } = useStore()

  if (
    !currentWeather ||
    !currentWeather?.weather ||
    currentWeather?.weather?.length === 0
  ) {
    return null
  }

  const { temp } = currentWeather
  const { description } = currentWeather?.weather[0]

  return (
    <View className='items-center space-y-2'>
      <AntDesign name='cloudo' size={60} color='#ded8d8' />
      <Text className='text-6xl font-bold text-white'>{temp}</Text>
      <Text className='text-xl text-gray-300'>{description}</Text>
    </View>
  )
}

export default CurrentWeather
