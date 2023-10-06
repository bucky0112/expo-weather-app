import { create } from 'zustand'
import * as Location from 'expo-location'
import dayjs from 'dayjs'

const convertHourlyToReadableTime = (
  hourlyData: HourlyWeatherInfo[],
  sliceCount: number = 5
) => {
  return hourlyData.slice(1, sliceCount).map((hour: HourlyWeatherInfo) => {
    const readableTime = dayjs.unix(hour.dt).format('HH:mm')
    return { ...hour, readableTime }
  })
}

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

interface HourlyWeatherInfo {
  dt: number
  temp: number
  weather: WeatherDetail[]
  readableTime: string
}

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface LocationResult {
  address_components: AddressComponent[]
}

interface Store {
  location: Location.LocationObject | null
  errorMsg: string | null
  currentWeather: CurrentWeatherInfo | null
  city: string | null
  currentDate: string | null
  hourlyWeather: HourlyWeatherInfo[] | null
  setCurrentDate: (date: string | null) => void
  setCity: (city: string | null) => void
  setLocation: (location: Location.LocationObject | null) => void
  setErrorMsg: (msg: string | null) => void
  setCurrentWeather: (weather: CurrentWeatherInfo | null) => void
  fetchWeatherData: () => Promise<void>
  fetchLocation: () => Promise<void>
}

const useStore = create<Store>((set) => ({
  location: null,
  errorMsg: null,
  currentWeather: null,
  city: null,
  currentDate: null,
  hourlyWeather: null,
  setCurrentDate: (date) => set({ currentDate: date }),
  setCity: (city) => set({ city }),
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
          `${apiUrl}lat=${latitude}&lon=${longitude}&exclude=minutely,daily&units=metric&appid=${apiKey}`
        )
        const json = await response.json()
        set({
          currentWeather: json.current,
          hourlyWeather: convertHourlyToReadableTime(json.hourly)
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  fetchLocation: async () => {
    const { location } = useStore.getState()

    if (location && location.coords) {
      const { latitude, longitude } = location.coords
      const apiUrl = process.env.EXPO_PUBLIC_GEOCODING_API_URL
      const apiKey = process.env.EXPO_PUBLIC_GEOCODING_API_KEY

      try {
        const res = await fetch(
          `${apiUrl}latlng=${latitude},${longitude}&key=${apiKey}&language=en`
        )
        const json = await res.json()
        const cityComponent = json.results
          .flatMap((result: LocationResult) => result.address_components)
          .find((component: AddressComponent) =>
            component.types.includes('locality')
          )

        if (cityComponent) {
          useStore.getState().setCity(cityComponent.long_name)
        } else {
          console.error('City name not found')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}))

export default useStore
