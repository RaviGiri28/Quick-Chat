import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
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
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ConcaveButtonStartChat from '../../components/startChatButton'
import { useNavigation } from '@react-navigation/native'
import TipsCaraousal from '../../components/tipsCaraousal'

const Index = () => {
  const uid = getAuth().currentUser?.uid;
  const svgCode = multiavatar(uid)
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.parentContainer}>
      <LinearGradient colors={['#ffecca', '#fff6e5', '#ffeac7']} start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }} style={{ flex: 1, paddingTop: insets.top }}>
        <View style={styles.container}>
          <View style={styles.headerArea}>
            <View style={{ alignItems: 'flex-start', }}>
              <Text style={styles.title}>Quick Chat</Text>
              <Text style={{ fontSize: responsiveFontSize(theme.fonts.extraSmall), color: theme.colors.grey, }}>Chat with strangers across the globe!</Text>
            </View>
            <View style={styles.headerLeft}>
              <Addcoins />
              <Pressable
                onPress={() => navigation.openDrawer()}>
                <SvgXml xml={svgCode} width={responsiveWidth(10)} height={responsiveWidth(10)} />
              </Pressable>
            </View>
          </View>
        </View>
        <FindMatchComponent />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(3), }}>
          <SetUpProfileComponent />
          <CoinsTrack />
        </View>
        <TipsCaraousal />
        {/* <View style={{borderBottomWidth:1, borderColor:'grey', borderStyle:'dashed',marginHorizontal:responsiveWidth(3),top:responsiveWidth(3),}}/> */}
        <ConcaveButtonStartChat />
      </LinearGradient>
    </ScrollView>
  )
}

export default Index

const styles = StyleSheet.create({
  parentContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.light,

  },
  container: {
    paddingBottom: responsiveWidth(1),
    marginBottom: responsiveWidth(2),
  },
  title: {
    fontSize: responsiveFontSize(4),
    color: '#6e3f20',
    textAlign: 'center',
    fontFamily: 'cursive',
    fontWeight: '900'
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    justifyContent: 'space-between',
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