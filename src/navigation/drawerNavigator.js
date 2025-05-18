import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomTabNavigator from './bottomTabNavigator'

const Drawer = createDrawerNavigator()
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false,drawerPosition:'right', }}>
      <Drawer.Screen name="Tabs" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

