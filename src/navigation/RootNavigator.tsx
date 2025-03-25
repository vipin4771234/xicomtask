import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{
          fullScreenGestureEnabled: false,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: '#50048A',
          },
        }}>
          <Stack.Screen
            name={'HomeScreen'}
            component={HomeScreen}
            options={{
              headerTitle: 'Xicom Project',
              headerShown: true,
              headerTitleStyle: {
                color: '#fff',
              }
            }}
          />
          <Stack.Screen
            name={'FormScreen'}
            component={FormScreen}
            options={{
              headerTitle: 'Detail Screen',
              headerTintColor: '#fff',
              headerShown: true,
              headerTitleStyle: {
                color: '#fff',
              }
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator