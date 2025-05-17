import { ImageBackground, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircularProgressBar from './circularProgressBar';
const SetUpProfileComponent = () => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('Set up profile')}>
            <LinearGradient colors={['#C0C0C0', '#FFC0CB']} start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }} style={styles.container}>
                <View style={{ paddingVertical: responsiveWidth(2.5), bottom: responsiveWidth(3) }}>
                    <CircularProgressBar progress={0.95} radius={35} strokeWidth={7} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', bottom: responsiveWidth(3) }}>
                    <Text style={styles.textProfile}>Setup your profile</Text>
                    <View style={{ overflow: 'hidden', borderRadius: responsiveWidth(5) }}>
                        <TouchableNativeFeedback
                            onPress={() => console.log('Set up profile')}
                            background={TouchableNativeFeedback.Ripple('#0000001A')}>
                            <View style={{ padding: responsiveWidth(1), borderRadius: responsiveWidth(5), }}>
                                <Icon name='arrow-forward-ios' size={responsiveFontSize(2.5)} color={theme.colors.secondary} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default SetUpProfileComponent;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingVertical: responsiveWidth(4),
        borderRadius: responsiveWidth(4),
        alignSelf: 'flex-start',
        paddingHorizontal: responsiveWidth(3),
    },
    textProfile: {
        fontSize: responsiveFontSize(2.1),
        fontWeight: '700',
        maxWidth: responsiveWidth(28),
    }
})