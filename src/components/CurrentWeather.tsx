import { View, Text } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { weatherIcons } from '../config/weatherIconsConfig'
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
  const { description, icon } = currentWeather?.weather[0]

  const IconComponent = weatherIcons[icon]?.component || Feather || Ionicons
  const iconName = weatherIcons[icon]?.name || 'question'
  const iconColor = weatherIcons[icon]?.color || '#ffffff'

  return (
    <View className='items-center space-y-2'>
      <IconComponent name={iconName} size={60} color={iconColor} />
      <Text className='text-6xl font-bold text-white'>{temp}</Text>
      <Text className='text-xl text-gray-300'>{description}</Text>
    </View>
  )
}

export default CurrentWeather
