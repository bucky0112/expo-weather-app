import { create } from 'zustand'
import * as Location from 'expo-location'

interface WeatherDetail {
  description: string
  icon: string
  id: number
  main: string
}

interface CurrentWeatherInfo {
  feels_like: number
  temp: number
  weather: WeatherDetail[]
}

interface Store {
  location: Location.LocationObject | null
  errorMsg: string | null
  currentWeather: CurrentWeatherInfo | null
  setLocation: (location: Location.LocationObject | null) => void
  setErrorMsg: (msg: string | null) => void
  setCurrentWeather: (weather: CurrentWeatherInfo | null) => void
  fetchWeatherData: () => Promise<void>
}

const useStore = create<Store>((set) => ({
  location: null,
  errorMsg: null,
  currentWeather: null,
  setLocation: (location) => set({ location }),
  setErrorMsg: (msg) => set({ errorMsg: msg }),
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  fetchWeatherData: async () => {
    const { location, errorMsg } = useStore.getState()
    if (location && location.coords) {
      const { latitude, longitude } = location.coords
      const apiUrl = process.env.EXPO_PUBLIC_WEATHER_API_URL
      const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY
      try {
        const response = await fetch(
          `${apiUrl}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=metric&appid=${apiKey}`
        )
        const json = await response.json()
        set({ currentWeather: json.current })
      } catch (err) {
        console.log(err)
      }
    }
  }
}))

export default useStore
