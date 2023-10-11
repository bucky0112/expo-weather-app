import { create } from 'zustand'
import * as Location from 'expo-location'
import dayjs from 'dayjs'

const convertHourlyToReadableTime = (
  hourlyData: HourlyWeatherInfo[],
  sliceCount: number = 25
) => {
  return hourlyData.slice(1, sliceCount).map((hour: HourlyWeatherInfo) => {
    const readableTime = dayjs.unix(hour.dt).format('HH:mm')
    return { ...hour, readableTime }
  })
}

const convertDailyToReadableDay = (
  dailyData: DailyWeatherInfo[],
  sliceCount: number = 7
) => {
  return dailyData.slice(1, sliceCount).map((day: DailyWeatherInfo) => {
    const readableDay = dayjs.unix(day.dt).format('dddd')
    return { ...day, readableDay }
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

export interface DailyWeatherInfo {
  dt: number
  temp: {
    max: number
    min: number
  }
  weather: WeatherDetail[]
  readableDay: string
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
  dailyWeather: DailyWeatherInfo[] | null
  searchCity: string
  setSearchCity: (city: string) => void
  setCurrentDate: (date: string | null) => void
  setCity: (city: string | null) => void
  setLocation: (location: Location.LocationObject | null) => void
  setErrorMsg: (msg: string | null) => void
  setCurrentWeather: (weather: CurrentWeatherInfo | null) => void
  fetchWeatherData: () => Promise<void>
  fetchLocation: () => Promise<void>
  fetchLatLngByCity: () => Promise<void>
}

const useStore = create<Store>((set) => ({
  location: null,
  errorMsg: null,
  currentWeather: null,
  city: null,
  currentDate: null,
  hourlyWeather: null,
  dailyWeather: null,
  searchCity: '',
  setSearchCity: (city) => set({ searchCity: city }),
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
          `${apiUrl}lat=${latitude}&lon=${longitude}&exclude=minutely,alert&units=metric&appid=${apiKey}`
        )
        const json = await response.json()
        set({
          currentWeather: json.current,
          hourlyWeather: convertHourlyToReadableTime(json.hourly),
          dailyWeather: convertDailyToReadableDay(
            json.daily.map((day: DailyWeatherInfo) => ({
              dt: day.dt,
              temp: {
                max: day.temp.max,
                min: day.temp.min
              },
              weather: day.weather
            }))
          )
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
  },
  fetchLatLngByCity: async () => {
    const { searchCity } = useStore.getState()

    if (searchCity) {
      const apiUrl = process.env.EXPO_PUBLIC_GEOCODING_API_URL
      const apiKey = process.env.EXPO_PUBLIC_GEOCODING_API_KEY

      try {
        const response = await fetch(
          `${apiUrl}address=${encodeURIComponent(
            searchCity
          )}&key=${apiKey}&language=en`
        )
        const json = await response.json()

        if (json?.results?.length > 0) {
          const location = json.results[0]?.geometry?.location
          useStore.getState().setLocation({
            coords: {
              latitude: location?.lat,
              longitude: location?.lng,
              altitude: null,
              accuracy: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null
            },
            timestamp: Date.now()
          })
        } else {
          console.error('Unable to fetch coordinates for the given city')
        }
      } catch (err) {
        useStore
          .getState()
          .setErrorMsg('Failed to fetch coordinates for the given city')
      }
    } else {
      console.warn('No search city provided')
    }
  }
}))

export default useStore
