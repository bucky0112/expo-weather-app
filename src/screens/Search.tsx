import { FC } from 'react'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import LottieView from 'lottie-react-native'
import useStore from '../store'

type TabNavigatorParams = {
  Home: undefined
  Search: undefined
}

type SearchProps = {
  navigation: StackNavigationProp<TabNavigatorParams, 'Search'>
}

const Search: FC<SearchProps> = ({ navigation }) => {
  const { searchCity, setSearchCity, fetchLatLngByCity } = useStore()

  const handleCityPress = () => {
    if (searchCity) {
      fetchLatLngByCity()
      navigation.navigate('Home')
    }

    navigation.navigate('Home')
  }

  const buttonText = searchCity ? 'Search' : 'Current Location'
  const windowWidth = useWindowDimensions().width
  const itemWidth = windowWidth / 2

  return (
    <SafeAreaView className='flex-1 bg-blue-500'>
      <View className='items-center gap-y-4 mt-2'>
        <TextInput
          className='w-11/12 border border-gray-300 bg-white rounded-lg px-1 h-12'
          onChangeText={setSearchCity}
          value={searchCity}
          placeholder='Search for a city...'
        />
        <TouchableOpacity
          className='w-2/3 bg-lime-500 rounded-full p-4'
          onPress={handleCityPress}
        >
          <Text className='text-center font-semibold'>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <View className='items-center mt-16'>
        <LottieView
          loop
          autoPlay
          source={require('../assets/location.json')}
          style={{
            width: itemWidth,
            height: itemWidth
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default Search
