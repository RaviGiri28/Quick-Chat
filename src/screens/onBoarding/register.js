import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions, TextInput, StyleSheet } from "react-native";
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../../theme';
import SignUpForm from "./signUpForm";
import LoginForm from "./loginForm";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const SWITCH_WIDTH = width * 0.7;
const SWITCH_HEIGHT = 45;
const BUTTON_WIDTH = SWITCH_WIDTH / 2;

const Register = () => {
  const [isSignUp, setIsSignUp]=useState(true);
  const translateX = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();
  const handleToggle = (signUpSelected) => {
    Animated.timing(translateX, {
      toValue: signUpSelected ? 0 : BUTTON_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(formOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsSignUp(signUpSelected);
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={[styles.container,{paddingTop:insets.top}]}>
      <Text style={styles.heading}>{isSignUp?`Set Up Your Account`:`Welcome Back`}</Text>
      <Text style={styles.subText}>{isSignUp?`Create an account or log in to explore ${"\n"} about our app.`: `Login to acess your account`}</Text>
    
      <View style={styles.switchContainer}>
        <Animated.View style={[styles.activeIndicator, { transform: [{ translateX }] }]} />
        <TouchableOpacity style={styles.button} onPress={() => handleToggle(true)}>
          <Text style={[styles.text, isSignUp && styles.activeText]}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleToggle(false)}>
          <Text style={[styles.text, !isSignUp && styles.activeText]}>Log In</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}>
        {isSignUp ? <SignUpForm/> : <LoginForm/>}
      </Animated.View>

    </View>
  )
}

export default Register;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff',
  },
  heading:{
    fontSize:responsiveFontSize(3.5),
    fontWeight:'700',
  },
  subText:{
    fontSize:responsiveFontSize(1.8),
    textAlign:'center',
    marginTop:responsiveWidth(1.3),
  },
  switchContainer: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    backgroundColor: "#eee",
    borderRadius: SWITCH_HEIGHT / 2,
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
    marginTop:responsiveWidth(10),
  },
  activeIndicator: {
    position: "absolute",
    width: BUTTON_WIDTH,
    height: "100%",
    backgroundColor: "#C7F464",
    borderRadius: SWITCH_HEIGHT / 2,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    fontSize: responsiveFontSize(theme.fonts.medium),
    color: "#666",
  },
  activeText: {
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    marginTop: responsiveWidth(5),
    width:'100%',
    paddingHorizontal:responsiveWidth(4)
  },
  form: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#C7F464",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
})
