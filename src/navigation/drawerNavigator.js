import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomTabNavigator from './bottomTabNavigator'
import DrawerContent from './drawerContent';
import Settings from '../screens/settings';
import Favorites from '../screens/Favorites';
import Support from '../screens/Support';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
const Drawer = createDrawerNavigator()
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: 'right', }}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="My Profile" component={Profile} options={{ headerShown: true, }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: true, }} />
      <Drawer.Screen name="Favorites" component={Favorites} options={{ headerShown: true, }} />
      <Drawer.Screen name="Support" component={Support} options={{ headerShown: true, }} />
      <Drawer.Screen name="Notifications" component={Notifications} options={{ headerShown: true, }} />
    </Drawer.Navigator>
  );
}

