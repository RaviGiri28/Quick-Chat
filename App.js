import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'
import { enableScreens } from 'react-native-screens'
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import theme from './theme'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Connectivity from './connectivity'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

enableScreens();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '503906370756-ibcqn7amgahkltccada7r8ebid449ge4.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, [])

  const handleAuthStateChanged = async (user) => {
    if (user) {
      try {
        // Reload the user's authentication state
        await user.reload();
        const userData = getAuth().currentUser;
        // If the user is still valid, set the user state
        if (userData) {
          setUser(userData);
        } else {
          // If the user is no longer valid, clear the user state
          setUser(null);
          try {
            await GoogleSignin.signOut();
          } catch (e) {
            console.error('Error signing out:', e.message);
          }
        }
      } catch (error) {
        console.error('Error reloading user:', error);
        setUser(null);
        try {
          await GoogleSignin.signOut();
        } catch (e) {
          console.error('Error signing out:', e.message);
        }
      }
    } else {
      setUser(null);
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        console.error('Error signing out:', e.message);
      }
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), handleAuthStateChanged)
    return unsubscribe;
  }, [])

  if (initializing) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={responsiveWidth(3)} color={'red'} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Connectivity>
      <NavigationContainer>
        <AppNavigator user={user} />
      </NavigationContainer>
    </Connectivity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})