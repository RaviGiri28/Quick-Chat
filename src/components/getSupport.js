import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GetSupport = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:responsiveFontSize(2.3), fontWeight:'600', color:'#3d3442',}}>Get Help & Support</Text>
      <Text style={{fontSize:responsiveFontSize(theme.fonts.small),}}>Are you facing any issue? Please Contact us.</Text>
     <View style={{alignItems:'center',marginVertical:responsiveWidth(3),marginTop:responsiveWidth(7)}}>
      <Image
      source={require('../assets/helpsupport.png')}
      style={{width:responsiveWidth(55), height:responsiveWidth(35),}}/>
     </View>
     <View style={styles.getSupportTile}>
        <View style={{flexDirection:'column',}}>
        <Text style={{fontSize:responsiveFontSize(1.8), fontWeight:'600',}}>Contact Support</Text>
        <Text  style={{fontSize:responsiveFontSize(1.3),color:theme.colors.grey,}}>Facing issues? Tap here to get help or contact us</Text>
        </View>
          <View style={{borderWidth:1,borderRadius:responsiveWidth(100),padding:responsiveWidth(1),backgroundColor:'#ffe5cd',elevation:2, borderColor:'#F1E1C6',}}>
            <Icon name='arrow-forward-ios' size={responsiveFontSize(1.5)} color={theme.colors.secondary} />
          </View>
     </View>
    </View>
  )
}

export default GetSupport;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:responsiveWidth(3),
    },
    getSupportTile:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderColor:theme.colors.grey,
        borderRadius:responsiveWidth(2),
        marginBottom:responsiveWidth(3),
        padding:responsiveWidth(1.8),
        paddingVertical:responsiveWidth(2.6),
        backgroundColor: '#F1E1C6',
        marginBottom:responsiveWidth(25),
    }
})