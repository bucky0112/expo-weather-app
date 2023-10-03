import { View, Text } from 'react-native'
import useStore from '../store'

const HeaderInfo = () => {
  const { city } = useStore()
  return (
    <View className='items-center p-6 space-y-4 w-500'>
      <Text className='text-2xl font-semibold text-white'>{city}</Text>
      <Text className='text-sm text-gray-200'>Monday, 12 September</Text>
    </View>
  )
}

export default HeaderInfo
