import { ComponentType } from 'react'
import { Ionicons, Fontisto } from '@expo/vector-icons'

export type IoniconsNames = keyof typeof Ionicons.glyphMap
export type FontistoNames = keyof typeof Fontisto.glyphMap

export interface WeatherIconConfig {
  component: ComponentType<any>
  name: IoniconsNames | FontistoNames
  color: string
}

export const weatherIcons: Record<string, WeatherIconConfig> = {
  '01d': { component: Ionicons, name: 'sunny', color: '#FFD700' },
  '01n': { component: Ionicons, name: 'sunny', color: '#64635e' },
  '02d': {
    component: Ionicons,
    name: 'partly-sunny-outline',
    color: '#cfd8e2'
  },
  '02n': { component: Ionicons, name: 'partly-sunny-sharp', color: '#64635e' },
  '03d': { component: Ionicons, name: 'cloud-outline', color: '#cfd8e2' },
  '03n': { component: Ionicons, name: 'cloudy-night-sharp', color: '#64635e' },
  '04d': { component: Ionicons, name: 'cloud-outline', color: '#cfd8e2' },
  '04n': { component: Ionicons, name: 'cloudy-night-sharp', color: '#64635e' },
  '09d': { component: Ionicons, name: 'rainy-outline', color: '#a9b2bc' },
  '09n': { component: Ionicons, name: 'rainy', color: '#64635e' },
  '10d': { component: Ionicons, name: 'rainy-outline', color: '#a9b2bc' },
  '10n': { component: Ionicons, name: 'rainy', color: '#64635e' },
  '11d': {
    component: Ionicons,
    name: 'thunderstorm-outline',
    color: '#a9b2bc'
  },
  '11n': { component: Ionicons, name: 'thunderstorm', color: '#64635e' },
  '13d': { component: Ionicons, name: 'snow', color: '#a9b2bc' },
  '13n': { component: Ionicons, name: 'snow', color: '#64635e' },
  '50d': { component: Fontisto, name: 'fog', color: '#a9b2bc' },
  '50n': { component: Fontisto, name: 'fog', color: '#64635e' }
}
