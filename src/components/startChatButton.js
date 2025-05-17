import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Animated, TouchableNativeFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';

const ConcaveButton = ({ onPress }) => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find A Match</Text>
            <Text style={styles.subtitle}>Tap below to start chatting</Text>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <View style={{borderRadius: responsiveWidth(100), marginTop: responsiveWidth(5), overflow: 'hidden', }}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,94,0,0.2)')}
                        onPress={onPress}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}>
                        <View style={[styles.outerRing, {
                            backgroundColor: 'rgba(255,94,0,0.2)', shadowColor: '#FF5400',
                        }]}>
                            <View style={styles.buttonContainer}>
                                <LinearGradient
                                    colors={['#FF7B00', '#FF0054']}
                                    start={{ x: 0.1, y: 0.1 }}
                                    end={{ x: 0.9, y: 0.9 }}
                                    style={styles.concaveGradient}
                                >
                                    <View style={[styles.innerDepression, { backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,200,150,0.4)' }]}>
                                        <Text style={[styles.buttonText, { textShadowColor: 'rgba(150,50,0,0.6)' }]}>Start Chat</Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </Animated.View>
        </View>
    );
};

const { width } = Dimensions.get('window');
const buttonSize = width * 0.5;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: responsiveWidth(6),
    },
    title: {
        color: theme.colors.grey,
        textAlign: 'center',
        fontSize: responsiveFontSize(2.3),
        fontWeight: '600',
        marginBottom: responsiveWidth(1)
    },
    subtitle: {
        color: theme.colors.grey,
        textAlign: 'center',
        fontSize: responsiveFontSize(theme.fonts.small)
    },
    outerRing: {
        width: buttonSize + 20,
        height: buttonSize + 20,
        borderRadius: (buttonSize + 20) / 2,
        backgroundColor: 'rgba(255,107,107,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 90,
    },
    buttonContainer: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        overflow: 'hidden',
    },
    concaveGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    innerDepression: {
        width: '100%',
        height: '100%',
        borderRadius: buttonSize / 2,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 0.8,
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default ConcaveButton;