import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const CoinPulse = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation =  Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();  
    // Cleanup the animation on component unmount
    return () => pulseAnimation.stop();
}, []);

  return (
    <Animated.View style={[styles.coinContainer, { transform: [{ scale: scaleAnim }] }]}>
       <Image
                source={require('../assets/coin.png')}
                style={{ width: responsiveWidth(5), height: responsiveWidth(5), }} />
      <Text style={styles.coinText}>20</Text>
       <View style={styles.coinsAdd}>
                <Text style={{ fontSize: responsiveFontSize(2) }}>+</Text>
            </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(2.5),
    gap: responsiveWidth(1.5),
    paddingVertical: responsiveWidth(1.5),
    borderRadius: responsiveWidth(8),
    elevation: 5,
    shadowColor: '#ffb300',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  coinText: {
    fontWeight: 'bold',
    color: '#333',
  },
   coinsAdd: {
        padding: responsiveWidth(0.1),
        paddingHorizontal: responsiveWidth(1.7),
        borderRadius: responsiveWidth(40),
        backgroundColor: '#F1E1C6',
        elevation: responsiveWidth(1),
    },
});

export default CoinPulse;
