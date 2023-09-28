import { useEffect } from 'react'
import { View, SafeAreaView, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import useStore from './src/store'
import {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  HeaderInfo
} from './src/components'

export default function App() {
  const { location, errorMsg, setLocation, setErrorMsg, fetchWeatherData } = useStore()

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  useEffect(() => {
    if (location) {
      fetchWeatherData()
    }
  }, [location])

  return (
    <SafeAreaView className='flex-1 bg-blue-500'>
      <StatusBar style='auto' />
      <HeaderInfo />
      <CurrentWeather />
      <View className='flex-row justify-around p-6'>
        <HourlyForecast time='4 PM' icon='sunny' temp='28' />
        <HourlyForecast time='5 PM' icon='cloudy' temp='26' />
        <HourlyForecast time='6 PM' icon='rainy' temp='26' />
        <HourlyForecast time='7 PM' icon='rainy' temp='25' />
      </View>
      <ScrollView>
        <View className='p-6'>
          <DailyForecast
            day='Tuesday'
            icon='rainy'
            tempHigh='73'
            tempLow='60'
          />
          <DailyForecast
            day='Wednesday'
            icon='cloudy'
            tempHigh='75'
            tempLow='62'
          />
          <DailyForecast
            day='Thursday'
            icon='sunny'
            tempHigh='77'
            tempLow='64'
          />
          <DailyForecast day='Friday' icon='sunny' tempHigh='79' tempLow='65' />
          <DailyForecast
            day='Saturday'
            icon='sunny'
            tempHigh='81'
            tempLow='66'
          />
          <DailyForecast day='Sunday' icon='sunny' tempHigh='82' tempLow='67' />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
