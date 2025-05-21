import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomTabNavigator from './bottomTabNavigator'
import Profile from '../screens/home/profile';
import DrawerContent from './drawerContent';

const Drawer = createDrawerNavigator()
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false,drawerPosition:'right', }}
    drawerContent={(props)=> <DrawerContent {...props}/>}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="My Profile" component={Profile} options={{headerShown:true,}} />

    </Drawer.Navigator>
  );
}

