import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import theme from '../../../theme'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import multiavatar from '@multiavatar/multiavatar'
import { SvgXml } from 'react-native-svg'
import { getAuth } from '@react-native-firebase/auth'
import FindMatchComponent from '../../components/findMatchComponent'
import Addcoins from '../../components/addcoins'
import SetUpProfileComponent from '../../components/setUpProfileComponent'
import CoinsTrack from '../../components/coinsTrack'
const Index = () => {
  const uid = getAuth().currentUser?.uid;
  const svgCode = multiavatar(uid)
  return (
    <View style={styles.parentContainer}>
      <LinearGradient colors={['#f3d1c4', '#fff']} start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }} style={{ flex: 1, }}>
        <View style={styles.container}>
          <View style={styles.headerArea}>
            <View style={{ alignItems: 'flex-start', }}>
              <Text style={styles.title}>Quick Chat</Text>
              <Text style={{ fontSize: responsiveFontSize(theme.fonts.extraSmall), color: theme.colors.grey, }}>Chat with strangers across the globe!</Text>
            </View>
            <View style={styles.headerLeft}>
              <Addcoins />
              <SvgXml xml={svgCode} width={responsiveWidth(10)} height={responsiveWidth(10)} />
            </View>
          </View>
        </View>
        <FindMatchComponent />
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:responsiveWidth(3),}}>
        <SetUpProfileComponent/>
        <CoinsTrack/>
        </View>
      </LinearGradient>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  container: {
    paddingBottom: responsiveWidth(1),
    marginBottom: responsiveWidth(2),
  },
  title: {
    fontSize: responsiveFontSize(4),
    color: theme.colors.dark,
    textAlign: 'center',
    fontFamily: 'cursive',
    fontWeight: '900'
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    justifyContent: 'space-between',
    paddingTop: responsiveWidth(2),
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3.5),
  },
  profileSection: {
    borderWidth: 1,
    borderColor: theme.colors.light,
    borderRadius: responsiveWidth(40),
    padding: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(3.5),
    elevation: responsiveWidth(1),
  }
})