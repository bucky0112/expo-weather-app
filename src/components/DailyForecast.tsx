import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { weatherIcons } from '../config/weatherIconsConfig'

interface DailyForecastProps {
  day: string
  icon: keyof typeof weatherIcons
  tempHigh: string
  tempLow: string
}

const DailyForecast: FC<DailyForecastProps> = ({
  day,
  icon,
  tempHigh,
  tempLow
}) => {
  const IconComponent = weatherIcons[icon]?.component || Feather || Ionicons
  const iconName = weatherIcons[icon]?.name || 'question'
  const iconColor = weatherIcons[icon]?.color || '#ffffff'

  return (
    <View className='flex-row justify-around items-center mb-8 mr-4'>
      <Text className='text-lg font-medium text-white w-28'>{day}</Text>
      <IconComponent name={iconName} size={30} color={iconColor} />
      <Text className='text-lg font-semibold text-white w-24'>
        {tempHigh}° / {tempLow}°
      </Text>
    </View>
  )
}

export default DailyForecast
