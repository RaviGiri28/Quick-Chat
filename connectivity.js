import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { addEventListener } from '@react-native-community/netinfo';
const Connectivity = ({children}) => {
    const [isConnected,setIsConnected] = useState(false)

    useEffect(()=>{
        const unsubscribe = addEventListener(state => {
        setIsConnected(state.isConnected);
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        
        });
        return () => {
            unsubscribe();
        };
    },[]);
    if(!isConnected){
  return (
    <View style={styles.noInternetContainer}>
        <Text style={styles.noInternetText}>Internet is not connected</Text>
      </View>
  )
}
return children;
};

export default Connectivity

const styles = StyleSheet.create({
    noInternetContainer: {
    flex: 1,
    backgroundColor: '#ffcccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInternetText: {
    fontSize: 18,
    color: '#cc0000',
  },
})