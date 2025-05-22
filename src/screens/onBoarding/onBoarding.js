import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, Animated } from 'react-native';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnBoarding = ({navigation}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  return (
    <View style={[styles.container,{paddingTop:insets.top}]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/chat.png')}
          style={styles.chatImage} />
      </View>

      <View style={styles.paragraph}>
        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(theme.fonts.large), fontWeight: '800', marginBottom: responsiveWidth(1), }}>Welcome To Random Chat !</Text>
        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(theme.fonts.body), fontWeight: '600', fontStyle: 'italic', lineHeight: responsiveWidth(6), }}>Looking for someone to talk to? RandomChat connects you with strangers for fun and interesting conversations. Tap 'Get Started' and start chatting now!</Text>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }],bottom:responsiveWidth(5), }}>
        <View style={{ marginBottom: responsiveWidth(5), borderRadius: responsiveWidth(10), overflow: 'hidden', }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#FF0000')}
            onPress={() => navigation.navigate('Register')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <LinearGradient colors={['#FF0000', '#FFA500']} start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} style={styles.getStartedButton}>
              <Text style={{ fontSize: responsiveFontSize(theme.fonts.large), fontWeight: '500', color: '#fff', }}>Get Started</Text>
            </LinearGradient>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    alignItems: 'center',
    borderWidth:1,
  },
  imageContainer: {
    borderColor: '#000',
  },
  chatImage: {
    width: responsiveWidth(80),
    height: responsiveWidth(80),
  },
  paragraph: {
    paddingHorizontal: responsiveWidth(2),
  },
  getStartedButton: {
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveWidth(2),
    borderRadius: responsiveWidth(10),
  }
});
