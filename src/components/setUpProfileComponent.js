import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';

const SetUpProfileComponent = () => {
  return (
    <ImageBackground
                source={require('../assets/subtlechat.png')}
                style={{ opacity:0.8,zIndex:999}}
>        
    <View style={styles.container}>
        
        <View style={styles.circle}/>
        <Text style={styles.textProfile}>Setup your profile</Text>
    </View>
        </ImageBackground>
  )
}

export default SetUpProfileComponent;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        borderWidth:1,
        paddingVertical:responsiveWidth(7),
        borderRadius:responsiveWidth(4),
        alignSelf:'flex-start',
        paddingHorizontal:responsiveWidth(4),
    },
    circle:{
        borderWidth:3,
        height:responsiveWidth(15),
        width:responsiveWidth(15),
        borderRadius:responsiveWidth(50),
        marginBottom:responsiveWidth(2),
        borderColor:'orange',
        backgroundColor:'white',
    },
    textProfile:{
        fontSize:responsiveFontSize(2.5),
        fontWeight:'700',
        maxWidth:responsiveWidth(30),
    }
})