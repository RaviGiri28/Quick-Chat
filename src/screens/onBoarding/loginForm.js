import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const logInButtonPress = () => {

    // Handle login button press
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('✅ Logged up as:', user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('❌ Error:', errorCode, errorMessage);
    });
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '503906370756-ibcqn7amgahkltccada7r8ebid449ge4.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, [])

  const signInWithGoogle = async () => {
    try {
      // Ensure Google services are available
      await GoogleSignin.hasPlayServices();
      // Get the Google user information
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;  // Extract the ID token from the user info
      console.log('Google Sign-In ID Token:', idToken);
      // Create Google credential with the ID token
      const googleCredential = GoogleAuthProvider.credential(idToken);
      // Sign in with the credential
      const auth = getAuth();
      const userCredential = await signInWithCredential(auth, googleCredential);
      console.log('✅ Google Sign-In successful:', userCredential.user);
    } catch (error) {
      console.log('❌ Google Sign-In error:', error.message);
    }
  };



  return (
    <ScrollView>
      <View style={{ marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
        <Text style={{ paddingLeft: responsiveWidth(1), color: '#808080', marginBottom: responsiveWidth(1.5), }}>Email</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter Your Email"
          textContentType='emailAddress'
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={{ marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
        <Text style={{ paddingLeft: responsiveWidth(1), color: '#808080', marginBottom: responsiveWidth(1.5), }}>Password</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter Password"
          secureTextEntry={true}
          cursorColor={theme.colors.primary}
          selectTextOnFocus={true}
          selectionColor={theme.colors.secondary}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: responsiveWidth(5), }}>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={{ fontSize: responsiveFontSize(1.8), }}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}>
          <Text style={{ fontSize: responsiveFontSize(1.8), color: theme.colors.danger, fontWeight: '600', }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: responsiveWidth(1.5), }}>
        <View style={{ width: responsiveWidth(60), alignSelf: 'center', borderRadius: responsiveWidth(10), overflow: 'hidden', }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#FF0000')}
            onPress={logInButtonPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <LinearGradient colors={['#FF0000', '#FFA500']} start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} style={styles.getStartedButton}>
              <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '500', color: '#fff', }}>Log In</Text>
            </LinearGradient>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
      <Text style={{ fontWeight: '600', fontSize: responsiveFontSize(2.2), color: 'grey', alignSelf: 'center', }}>or</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={() => signInWithGoogle().catch((error) => console.log(error.message))}>
        <View style={styles.googleButton}>
          <Image
            source={require('../../assets/google.png')}
            style={styles.googleImage} />
          <Text style={styles.googleBtnTxt}>Sign In with google</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: responsiveWidth(1),
    borderRadius: responsiveWidth(5),
    width: responsiveWidth(43),
    paddingLeft: responsiveWidth(3),
    color: theme.colors.black,
  },
  emailInput: {
    borderWidth: 1,
    marginTop: responsiveWidth(1),
    borderRadius: responsiveWidth(5),
    paddingLeft: responsiveWidth(3),
    color: theme.colors.black,
    borderColor: theme.colors.grey,
  },
  getStartedButton: {
    paddingVertical: responsiveWidth(1.8),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
  },
  googleButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
    borderWidth: 1,
    marginTop: responsiveWidth(2),
    alignSelf: 'center',
    padding: responsiveWidth(2),
    borderRadius: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(8.5),
  },
  googleBtnTxt: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
  },
  googleImage: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  }
})