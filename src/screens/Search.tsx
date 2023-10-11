import { FC } from 'react'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import useStore from '../store'

type TabNavigatorParams = {
  Home: undefined
  Search: undefined
}

type SearchProps = {
  navigation: StackNavigationProp<TabNavigatorParams, 'Search'>;
};

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
          <Text className='text-center'>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Search
