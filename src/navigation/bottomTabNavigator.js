import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons' // Or use your preferred icon package
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeScreen from '../screens/home'
import Wallet from '../screens/Wallet'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator();
const TabButton = ({ children, onPress, isLast }) => (
  <View style={styles.tabButtonContainer}>
    <Pressable onPress={onPress}
      android_ripple={{ radius: responsiveWidth(6)}}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical:responsiveWidth(3), }}>
      {children}
    </Pressable>
    {!isLast && <View style={styles.verticalLine} />}
  </View>
)

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator initialRouteName='HomeTab'
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { ...styles.tabBar, paddingBottom: insets.left },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        children={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={24} color={focused ? '#FF5A5F' : '#999'} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        children={Wallet}
        options={{
          headerShown:true,
          tabBarIcon: ({ focused }) => (
            <Icon name="wallet" size={24} color={focused ? '#FF5A5F' : '#999'} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown:true,
          tabBarIcon: ({ focused }) => (
            <Icon name="person" size={24} color={focused ? '#FF5A5F' : '#999'} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: responsiveWidth(7),
    backgroundColor:'#ffebde',
    borderRadius: responsiveWidth(50),
    height: responsiveWidth(14),
    marginHorizontal: responsiveWidth(7),
    elevation: 5,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
  },
  tabButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  verticalLine: {
    width: 1,
    height: '50%',
    backgroundColor: '#ccc',
  },
});
