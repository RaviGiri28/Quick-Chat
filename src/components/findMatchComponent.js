import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';

const FindMatchComponent = () => {
  return (
    <View>
      <LinearGradient colors={['#a18cd1', '#fbc2eb']} start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }} style={{
          borderRadius: responsiveWidth(3),
          paddingHorizontal: responsiveWidth(3),
          paddingVertical: responsiveWidth(2),
          backgroundColor: '#ffe4e1',
          margin: responsiveWidth(3),
          shadowColor: '#fff',
          elevation: responsiveWidth(1),
        }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: responsiveFontSize(2.4), fontWeight: '800', color: '#1e1e1e', maxWidth: responsiveWidth(61), }}>Welcome back, ready to chat with someone new?</Text>
            <Text style={{ marginTop: responsiveWidth(1), color: '#333', fontSize: responsiveFontSize(theme.fonts.small), }}>Tap below to start chatting.</Text>
            {/* <LinearGradient colors={['#EEE', '#fff']} start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }} style={{ borderWidth: 1, marginVertical: responsiveWidth(2), paddingHorizontal: responsiveWidth(3), alignSelf: 'flex-start', padding: responsiveWidth(2), borderRadius: responsiveWidth(10), backgroundColor: theme.colors.light, borderColor: theme.colors.light, }}>
                <Text style={{ fontWeight: '600', color: theme.colors.grey, }}>Find A Match</Text>
              </LinearGradient> */}

            <TouchableOpacity style={styles.matchButton}>
              <Text style={styles.matchButtonText}>Find A Match</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/globechat.png')}
            style={{ width: responsiveWidth(30), height: responsiveWidth(20), resizeMode: 'cover' }} />
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  matchButton: {
    marginVertical: responsiveWidth(2),
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveWidth(2.5),
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 6, // For Android
  },
  matchButtonText: {
    color: theme.colors.grey,
    fontWeight:'700',
  }
});

export default FindMatchComponent;