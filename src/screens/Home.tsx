import { useEffect, memo } from 'react'
import { View, SafeAreaView, FlatList, useWindowDimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import useStore, { DailyWeatherInfo } from '../store'
import {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  HeaderInfo
} from '../components'

const Home = () => {
  const {
    location,
    errorMsg,
    setLocation,
    setErrorMsg,
    fetchWeatherData,
    fetchLocation,
    hourlyWeather,
    dailyWeather,
    searchCity
  } = useStore()

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    !searchCity && getCurrentLocation()
  }, [searchCity])

  useEffect(() => {
    if (location) {
      fetchWeatherData()
      fetchLocation()
    }
  }, [location])

  const windowWidth = useWindowDimensions().width
  const itemWidth = windowWidth / 4

  const MemoizedHourlyForecast = memo(HourlyForecast)

  const renderDailyItem = ({ item }: { item: DailyWeatherInfo }) => {
    const { temp, readableDay } = item
    const tempHigh = Math.round(temp.max).toString()
    const tempLow = Math.round(temp.min).toString()

    return (
      <DailyForecast
        day={readableDay}
        icon={item.weather[0].icon}
        tempHigh={tempHigh}
        tempLow={tempLow}
      />
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-blue-500'>
      <StatusBar style='auto' />
      <HeaderInfo />
      <CurrentWeather />
      <View className='flex-row py-6 mb-6'>
        <FlatList
          data={hourlyWeather}
          keyExtractor={({ dt }) => dt.toString()}
          renderItem={({ item }) => {
            const { temp, readableTime, weather } = item
            return (
              <View style={{ width: itemWidth }}>
                <MemoizedHourlyForecast
                  time={readableTime}
                  icon={weather[0].icon}
                  temp={temp}
                />
              </View>
            )
          }}
          horizontal
        />
      </View>
      <FlatList
        data={dailyWeather}
        keyExtractor={({ dt }) => dt.toString()}
        renderItem={renderDailyItem}
      />
    </SafeAreaView>
  )
}

export default Home
