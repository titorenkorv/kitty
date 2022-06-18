import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StartScreen } from '@src/screens/start'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { RegisterScreen } from '@src/screens/register'

const Stack = createStackNavigator()
export const RouteContainer = () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApplicationProvider>
)
