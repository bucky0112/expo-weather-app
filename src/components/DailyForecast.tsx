import React, { FC, ComponentType } from 'react'
import { View, Text } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'

type AntDesignNames = keyof typeof AntDesign.glyphMap
type FeatherNames = keyof typeof Feather.glyphMap

interface WeatherIconConfig {
  component: ComponentType<any>
  name: AntDesignNames | FeatherNames
}

interface DailyForecastProps {
  day: string
  icon: keyof typeof weatherIcons
  tempHigh: string
  tempLow: string
}

const weatherIcons: Record<string, WeatherIconConfig> = {
  sunny: { component: Feather, name: 'sun' },
  cloudy: { component: AntDesign, name: 'cloudo' },
  rainy: { component: Feather, name: 'cloud-rain' }
}

const DailyForecast: FC<DailyForecastProps> = ({
  day,
  icon,
  tempHigh,
  tempLow
}) => {
  const IconComponent = weatherIcons[icon]?.component || AntDesign
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
