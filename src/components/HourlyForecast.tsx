import React, { FC, ComponentType } from 'react'
import { View, Text } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'

type AntDesignNames = keyof typeof AntDesign.glyphMap
type FeatherNames = keyof typeof Feather.glyphMap

interface WeatherIconConfig {
  component: ComponentType<any>
  name: AntDesignNames | FeatherNames
}

interface HourlyForecastProps {
  time: string
  icon: keyof typeof weatherIcons
  temp: string
}

const weatherIcons: Record<string, WeatherIconConfig> = {
  sunny: { component: Feather, name: 'sun' },
  cloudy: { component: AntDesign, name: 'cloudo' },
  rainy: { component: Feather, name: 'cloud-rain' }
}

const HourlyForecast: FC<HourlyForecastProps> = ({ time, icon, temp }) => {
  const IconComponent = weatherIcons[icon]?.component || AntDesign
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
