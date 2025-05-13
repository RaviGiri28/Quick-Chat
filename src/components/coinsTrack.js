import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

const CoinsTrack = () => {
  return (
    <LinearGradient colors={['#FFD700', '#FFC0CB']} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.container}>
        <View style={styles.circle}>
            <Image
            source={require('../assets/gold.png')}
            style={{width:responsiveWidth(10),height:responsiveWidth(10),resizeMode:'cover',}}/>
        </View>
        <Text style={styles.textProfile}>Track your rewards & coins in your wallet</Text>
    </LinearGradient>
  )
}

export default CoinsTrack;

const styles = StyleSheet.create({
     container: {
            justifyContent: 'space-between',
            borderWidth:1,
            borderColor:'#FFC0CB',
            paddingVertical:responsiveWidth(4),
            borderRadius:responsiveWidth(5),
            alignSelf:'flex-start',
            paddingHorizontal:responsiveWidth(5),
        },
        circle:{
            borderWidth:2,
            height:responsiveWidth(15),
            width:responsiveWidth(15),
            borderRadius:responsiveWidth(50),
            marginBottom:responsiveWidth(2),
            borderColor:'orange',
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center',
        },
        textProfile:{
            fontSize:responsiveFontSize(2.5),
            fontWeight:'700',
            maxWidth:responsiveWidth(42),
        }
})