import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import OnBoarding from '../screens/onBoarding/onBoarding';
import Register from '../screens/onBoarding/register';
import LoginForm from '../screens/onBoarding/loginForm';
import SignUpForm from '../screens/onBoarding/signUpForm';
import DrawerNavigator from './drawerNavigator';
import RadarFindMatch from '../screens/home/radarFindMatch';
import Notifications from '../screens/Notifications';
import NoAds from '../screens/NoAds/noAds';
import ChatScreen from '../screens/chats/chatScreen';
const Stack= createStackNavigator();

export default function AppNavigator({user}) {
  return (
    <Stack.Navigator initialRouteName={user?'MainApp':'onBoarding'}>
      {!user?(
        <>
        <Stack.Screen name='onBoarding' component={OnBoarding} options={{headerShown:false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='LoginForm' component={LoginForm} options={{headerShown:false}}/>
        <Stack.Screen name='SignUpForm' component={SignUpForm} options={{headerShown:false}}/>
        </>
      ):(
        <>
        <Stack.Screen name='MainApp' component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='RadarFindMatch' component={RadarFindMatch} options={{ headerShown: false }} />
        <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name='NoAds' component={NoAds} options={{ headerShown: false }} />
        <Stack.Screen name='chats' component={ChatScreen} options={{ headerShown: false }} />
        </>
      )
      }
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({})