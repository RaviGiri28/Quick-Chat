import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';

const Addcoins = () => {
    return (
        <View style={styles.coinsArea}>
            <Image
                source={require('../assets/coin.png')}
                style={{ width: responsiveWidth(5), height: responsiveWidth(5), }} />
            <Text style={{ fontSize: responsiveFontSize(2), }}>20</Text>
            <View style={styles.coinsAdd}>
                <Text style={{ fontSize: responsiveFontSize(2) }}>+</Text>
            </View>
        </View>
    )
}

export default Addcoins;

const styles = StyleSheet.create({
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
})