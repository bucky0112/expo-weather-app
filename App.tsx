import { useEffect, memo } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  useWindowDimensions
} from 'react-native'
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
  const {
    location,
    errorMsg,
    setLocation,
    setErrorMsg,
    fetchWeatherData,
    fetchLocation,
    hourlyWeather
  } = useStore()

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
      fetchLocation()
    }
  }, [location])

  const windowWidth = useWindowDimensions().width
  const itemWidth = windowWidth / 4

  const MemoizedHourlyForecast = memo(HourlyForecast)

  return (
    <SafeAreaView className='flex-1 bg-blue-500'>
      <StatusBar style='auto' />
      <HeaderInfo />
      <CurrentWeather />
      <View className='flex-row py-6'>
        <FlatList
          data={hourlyWeather}
          keyExtractor={({ dt }) => dt.toString()}
          renderItem={({ item }) => {
            const { temp, readableTime } = item
            return (
              <View style={{ width: itemWidth }}>
                <MemoizedHourlyForecast
                  time={readableTime}
                  icon='cloudy'
                  temp={temp}
                />
              </View>
            )
          }}
          horizontal
        />
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
