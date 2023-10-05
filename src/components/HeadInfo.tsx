import { useEffect } from 'react'
import { View, Text } from 'react-native'
import dayjs from 'dayjs'
import useStore from '../store'

const HeaderInfo = () => {
  const { city, currentDate, setCurrentDate } = useStore()

  const updateCurrentDate = () => {
    const now = dayjs()
    setCurrentDate(now.format('dddd, D MMMM'))
  }

  useEffect(() => {
    updateCurrentDate()

    const interval = setInterval(() => {
      updateCurrentDate()
    }, 1000 * 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <View className='items-center p-6 space-y-4 w-500'>
      <Text className='text-2xl font-semibold text-white'>{city}</Text>
      <Text className='text-sm text-gray-200'>{currentDate}</Text>
    </View>
  )
}

export default HeaderInfo
