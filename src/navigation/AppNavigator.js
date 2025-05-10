import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import OnBoarding from '../screens/onBoarding/onBoarding';
import Register from '../screens/onBoarding/register';
import LoginForm from '../screens/onBoarding/loginForm';
import SignUpForm from '../screens/onBoarding/signUpForm';
import Index from '../screens/home';
const Stack= createStackNavigator();

export default function AppNavigator({user}) {
  return (
    <Stack.Navigator initialRouteName={user?'Index':'onBoarding'}>
      {!user?(
        <>
        <Stack.Screen name='onBoarding' component={OnBoarding}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='LoginForm' component={LoginForm} options={{headerShown:false}}/>
        <Stack.Screen name='SignUpForm' component={SignUpForm} options={{headerShown:false}}/>
        </>
      ):(
        <>
        <Stack.Screen name='Index' component={Index} options={{ headerShown: false }} />
        </>
      )
      }
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({})