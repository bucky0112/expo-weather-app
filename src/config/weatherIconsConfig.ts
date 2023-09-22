import { ComponentType } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'

export type AntDesignNames = keyof typeof AntDesign.glyphMap
export type FeatherNames = keyof typeof Feather.glyphMap

export interface WeatherIconConfig {
  component: ComponentType<any>
  name: AntDesignNames | FeatherNames
}

export const weatherIcons: Record<string, WeatherIconConfig> = {
  sunny: { component: Feather, name: 'sun' },
  cloudy: { component: AntDesign, name: 'cloudo' },
  rainy: { component: Feather, name: 'cloud-rain' }
}
