import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';
const CoinsTrack = () => {
  return (
    <LinearGradient colors={['#FFD700', '#FFC0CB']} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.container}>
        <View style={styles.circle}>
            <Image
            source={require('../assets/gold.png')}
            style={{width:responsiveWidth(10),height:responsiveWidth(10),resizeMode:'cover',}}/>
        </View>
        <View style={{flexDirection:'row',alignItems:'center', gap:responsiveWidth(2),}}>
        <Text style={styles.textProfile}>Track your rewards & coins in your wallet</Text>
<View style={{overflow:'hidden',borderRadius:responsiveWidth(5)}}>
                    <TouchableNativeFeedback
                        onPress={() => console.log('Set up profile')}
                        background={TouchableNativeFeedback.Ripple('#0000001A')}>
                    <View style={{padding:responsiveWidth(1),borderRadius:responsiveWidth(5),}}>
                    <Icon name='arrow-forward-ios' size={responsiveFontSize(2.5)} color={theme.colors.secondary}/>
                            </View>
                    </TouchableNativeFeedback>
                    </View>        
                    </View>
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
            paddingHorizontal:responsiveWidth(3),
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
            fontSize:responsiveFontSize(2.1),
            fontWeight:'700',
            maxWidth:responsiveWidth(33),
        }
})