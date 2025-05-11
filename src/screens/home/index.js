import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import theme from '../../../theme'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import multiavatar from '@multiavatar/multiavatar'
import { SvgXml } from 'react-native-svg'
import { getAuth } from '@react-native-firebase/auth'
const Index = () => {
  const uid= getAuth().currentUser?.uid;
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
              <View style={styles.coinsArea}>
                <Image
                  source={require('../../assets/coin.png')}
                  style={{ width: responsiveWidth(5), height: responsiveWidth(5), }} />
                <Text style={{ fontSize: responsiveFontSize(2), }}>20</Text>
                <View style={styles.coinsAdd}>
                  <Text style={{ fontSize: responsiveFontSize(2) }}>+</Text>
                </View>
              </View>
              <SvgXml xml={svgCode} width={responsiveWidth(10)} height={responsiveWidth(10)} />
            </View>
          </View>
        </View>

        <LinearGradient colors={['#a18cd1', '#fbc2eb']} start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }} style={{
            borderRadius: responsiveWidth(3),
            paddingHorizontal: responsiveWidth(5),
            paddingVertical: responsiveWidth(2),
            backgroundColor: '#ffe4e1',
            margin: responsiveWidth(3),
            shadowColor: '#fff',
            elevation: responsiveWidth(1),
          }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: responsiveFontSize(theme.fonts.large), fontWeight: '800', color: '#1e1e1e', maxWidth: responsiveWidth(61), }}>Welcome back, ready to chat with someone new?</Text>
              <Text style={{ marginTop: responsiveWidth(1), color: '#333', fontSize: responsiveFontSize(theme.fonts.small), }}>Tap below to start chatting.</Text>
              <LinearGradient colors={['#EEE', '#fff']} start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }} style={{ borderWidth: 1, marginVertical: responsiveWidth(2), paddingHorizontal: responsiveWidth(3), alignSelf: 'flex-start', padding: responsiveWidth(2), borderRadius: responsiveWidth(10), backgroundColor: theme.colors.light, borderColor: theme.colors.light, }}>
                <Text style={{ fontWeight: '600', color: theme.colors.grey, }}>Find A Match</Text>
              </LinearGradient>
            </View>
            <Image
              source={require('../../assets/globechat.png')}
              style={{ width: responsiveWidth(30), height: responsiveWidth(20), resizeMode: 'cover' }} />
          </View>
        </LinearGradient>
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
  coinsArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: responsiveWidth(2),
    borderWidth: 1,
    borderColor: theme.colors.light,
    padding: responsiveWidth(1.2),
    borderRadius: responsiveWidth(2),
    backgroundColor: theme.colors.light,
  },
  coinsAdd: {
    padding: responsiveWidth(0.1),
    paddingHorizontal: responsiveWidth(1.7),
    borderRadius: responsiveWidth(40),
    backgroundColor: '#F1E1C6',
    elevation: responsiveWidth(1),
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