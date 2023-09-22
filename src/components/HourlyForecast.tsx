import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { weatherIcons } from '../config/weatherIconsConfig'

interface HourlyForecastProps {
  time: string
  icon: keyof typeof weatherIcons
  temp: string
}

const HourlyForecast: FC<HourlyForecastProps> = ({ time, icon, temp }) => {
  const IconComponent = weatherIcons[icon]?.component || AntDesign || Feather
  const iconName = weatherIcons[icon]?.name || 'question'

  return (
    <View className='items-center space-y-2'>
      <Text className='text-sm font-medium text-white'>{time}</Text>
      <IconComponent name={iconName} size={30} color='#ded8d8' />
      <Text className='text-lg font-semibold text-white'>{temp}</Text>
    </View>
  )
}

export default HourlyForecast
