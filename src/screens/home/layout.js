import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './index';
import Profile from './profile';

const Stack = createStackNavigator();

export default function HomeLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
}
