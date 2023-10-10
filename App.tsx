import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/screens/Home'
import Search from './src/screens/Search'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Search' component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
