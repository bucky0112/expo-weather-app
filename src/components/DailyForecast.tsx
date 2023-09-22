import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
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
  const IconComponent = weatherIcons[icon]?.component || AntDesign || Feather
  const iconName = weatherIcons[icon]?.name || 'question'

  return (
    <View className='flex-row justify-around items-center mb-8 mr-4'>
      <Text className='text-lg font-medium text-white w-28'>{day}</Text>
      <IconComponent name={iconName} size={30} color='#ded8d8' />
      <Text className='text-lg font-semibold text-white w-24'>
        {tempHigh}° / {tempLow}°
      </Text>
    </View>
  )
}

export default DailyForecast
