import { ImageBackground, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SetUpProfileComponent = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('Set up profile')}>
    <LinearGradient colors={['#C0C0C0', '#FFC0CB']} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.container}>
            <View style={styles.circle}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.textProfile}>Setup your profile</Text>
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
    </TouchableOpacity>
  )
}

export default SetUpProfileComponent;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        borderWidth:1,
        paddingVertical:responsiveWidth(6.5),
        borderRadius:responsiveWidth(4),
        alignSelf:'flex-start',
        paddingHorizontal:responsiveWidth(3),
        borderColor:'#C0C0C0',
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
        fontSize:responsiveFontSize(2.1),
        fontWeight:'700',
        maxWidth:responsiveWidth(28),
    }
})