import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import GenderModal from '../modals/genderModal';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerModalVisible, setDatePickerModalVisibility] = useState(false);
  const [gender, setGender]= useState('Select Gender');
  const [isGenderModalVisible, setGenderModalVisibility]= useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [message, setMessage] = useState('');

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

  const registerButton=async()=>{
    try{
      if (!email || !password) {
        setMessage('❌ Email and password are required');
        return;
      }

      const userCredential= await createUserWithEmailAndPassword(getAuth(),email,password)
      setMessage(`✅ Signed up as: ${userCredential.user.email}`);
      console.log(userCredential.user.email);
    }catch (error) {
      console.log(error.message);
      setMessage(`❌ Sign-up error: ${error.message}`);
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '503906370756-ibcqn7amgahkltccada7r8ebid449ge4.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, [])
  

  const signInWithGoogle =async()=>{
      // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    //Get the user's ID token
    const getGoogleAuth= await GoogleSignin.signIn({prompt: 'select_account'});
    idToken= getGoogleAuth.data?.idToken;
    if (!idToken) {
    idToken= getGoogleAuth.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found in Google sign-in response');
    }
    // Create a new credential using the ID token
    const googleCredential= GoogleAuthProvider.credential(getGoogleAuth.data.idToken);
    // Sign-in the user with the credential
    return getAuth().signInWithCredential(googleCredential)
      .then((userCredential) => {
        console.log('User signed in with Google:', userCredential.user.email);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error.message);
      });
  }
  return (
    <ScrollView>
      <View style={{marginBottom: responsiveWidth(1), display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
        <View style={{ display: 'flex', flexDirection: 'column', marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
          <Text style={{ paddingLeft: responsiveWidth(1), }}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
          <Text style={{ paddingLeft: responsiveWidth(1), }}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
          />
        </View>
      </View>
      <View style={{marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
        <Text style={{ paddingLeft: responsiveWidth(1), }}>Email</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter Your Email"
          textContentType='emailAddress'
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={{marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
        <Text style={{ paddingLeft: responsiveWidth(1), }}>Username</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter Username"
          textContentType='username'
        />
      </View>
      <View style={{marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
        <View style={{marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
          <Text style={{ paddingLeft: responsiveWidth(1), }}>Password</Text>
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
        <View style={{marginBottom: responsiveWidth(1), paddingBottom: responsiveWidth(2), }}>
          <Text style={{ paddingLeft: responsiveWidth(1), }}>Gender</Text>
          <TouchableOpacity onPress={() => setGenderModalVisibility(true)} activeOpacity={0.8}>
            <TextInput
              style={styles.emailInput}
              placeholder={gender}
              editable={false}
            /> 
          </TouchableOpacity>
        </View>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
          <View style={{display:'flex', flexDirection:'column',}}>
            <Text style={{ paddingLeft: responsiveWidth(1),marginBottom:responsiveWidth(1),}}>Date of Birth</Text>
            <TouchableOpacity
              onPress={() => setDatePickerModalVisibility(true)}
              style={{
                //width:responsiveWidth(50),
                paddingHorizontal:responsiveWidth(11),
                padding: responsiveWidth(2.5),
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: responsiveWidth(10),
                alignItems: 'center',
                marginBottom: responsiveWidth(3), 
              }}
            >
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View style={{display:'flex', flexDirection:'column',marginRight:responsiveWidth(15),}}>
            <Text style={{ paddingLeft: responsiveWidth(1),marginBottom:responsiveWidth(1),}}>Age</Text>
              <View
                style={{
                  paddingVertical: responsiveWidth(2),
                  paddingHorizontal:responsiveWidth(3),
                  borderWidth: 1,
                  borderColor: 'gray',
                  alignItems: 'center',
                  marginBottom: responsiveWidth(3), 
                }}
              >
                <Text style={{fontSize:responsiveFontSize(theme.fonts.medium),}}>18</Text>
              </View>
          </View>
        </View>
      </View>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom:responsiveWidth(2), }}>
        <View style={{ width:responsiveWidth(60),alignSelf:'center',borderRadius: responsiveWidth(10), overflow: 'hidden', }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#FF0000')}
            onPress={registerButton}            
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <LinearGradient colors={['#FF0000', '#FFA500']} start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} style={styles.getStartedButton}>
              <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '500', color: '#fff', }}>Register</Text>
            </LinearGradient>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
      <Text style={{fontWeight:'600',fontSize:responsiveFontSize(2.2),color:'grey',alignSelf:'center',}}>or</Text>
      <TouchableOpacity activeOpacity={0.8} onPress={()=>signInWithGoogle().catch((error)=>console.log(error.message))}>
        <View style={styles.googleButton}>
            <Image
                source={require('../../assets/google.png')}
                style={styles.googleImage} />
            <Text style={styles.googleBtnTxt}>Sign Up with google</Text>
        </View>
      </TouchableOpacity>
      <DateTimePicker
          isVisible={isDatePickerModalVisible}
          mode="date"
          date={date}
          onConfirm={(selectedDate) => {
            setDatePickerModalVisibility(false);
            setDate(selectedDate);
          }}
          onCancel={() => setDatePickerModalVisibility(false)}
        />
        <GenderModal
        isVisible={isGenderModalVisible}
        onClose={() => setGenderModalVisibility(false)}
        onSelectGender={(selectedGender) => {
          setGender(selectedGender);
          setGenderModalVisibility(false);
        }}
        />
    </ScrollView>
  )
}

export default SignUpForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: responsiveWidth(1),
    borderRadius: responsiveWidth(5),
    width: responsiveWidth(43),
    paddingLeft: responsiveWidth(3),
    color:theme.colors.black,
  },
  emailInput: {
    borderWidth: 1,
    marginTop: responsiveWidth(1),
    borderRadius: responsiveWidth(5),
    paddingLeft: responsiveWidth(3),
    color:theme.colors.black,
  },
  getStartedButton: {
    paddingVertical: responsiveWidth(1.8),
    borderRadius: responsiveWidth(10),
    alignItems:'center',
  },
  googleButton:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:responsiveWidth(2),
    borderWidth:1,
    marginTop:responsiveWidth(2),
    alignSelf:'center',
    padding:responsiveWidth(2),
    borderRadius:responsiveWidth(10),
    paddingHorizontal:responsiveWidth(8.5),
  },
  googleBtnTxt:{
    fontSize:responsiveFontSize(1.9),
    fontWeight:'600',
  },
  googleImage:{
    width:responsiveWidth(6),
    height:responsiveWidth(6),
  }
})