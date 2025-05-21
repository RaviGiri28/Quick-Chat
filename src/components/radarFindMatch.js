import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';
const { width } = Dimensions.get('window');
const RADAR_RADIUS = width * 0.4;
const AVATAR_SIZE = 40;

const OrbitingAvatar = ({ source, radius, initialAngle = 0, clockwise = true }) => {
  const angle = useSharedValue(initialAngle);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Orbit rotation
    angle.value = withRepeat(
      withTiming(initialAngle + (clockwise ? 2 * Math.PI : -2 * Math.PI), {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1
    );

    // Pulsing
    scale.value = withRepeat(
      withTiming(1.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

   const animatedStyle = useAnimatedStyle(() => {
    const x = radius * Math.cos(angle.value);
    const y = radius * Math.sin(angle.value);

    return {
      transform: [
        { translateX: x },
        { translateY: y },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.Image
      source={source}
         style={[styles.avatar, animatedStyle]}
    />
  );
};

const FindingMatchScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('ChatScreen'); // Replace with your chat screen
    }, 6000);
    return () => clearTimeout(timeout);
  }, []);

  const avatars = [
    { source: require('../../assets/circle.png'), radius: RADAR_RADIUS * 0.7, angle: 0, clockwise: true },
    { source: require('../../assets/chat.png'), radius: RADAR_RADIUS * 0.7, angle: Math.PI / 2, clockwise: false },
    { source: require('../../assets/gold.png'), radius: RADAR_RADIUS * 0.5, angle: Math.PI, clockwise: true },
    { source: require('../../assets/interests.png'), radius: RADAR_RADIUS * 0.5, angle: (3 * Math.PI) / 2, clockwise: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finding your partner to talk with...</Text>

      <View style={styles.radarWrapper}>
        {/* Radar Rings */}
        {[1, 0.7, 0.4].map((factor, i) => (
          <View
            key={i}
            style={[
              styles.ring,
              {
                width: RADAR_RADIUS * 2 * factor,
                height: RADAR_RADIUS * 2 * factor,
                borderRadius: RADAR_RADIUS * factor,
              },
            ]}
          />
        ))}

        {/* Radar Sweep */}
        <RadarSweep />

        {/* Orbiting Avatars */}
        <View style={styles.avatarWrapper}>
          {avatars.map((a, i) => (
            <OrbitingAvatar
              key={i}
              source={a.source}
              radius={a.radius}
              initialAngle={a.angle}
              clockwise={a.clockwise}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const RadarSweep = ({ radius }) => {
  const rotation = useSharedValue(0);
   useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

 const sweepStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
   return (
    <Animated.View style={[styles.sweep, { width: radius * 2, height: radius * 2 }, sweepStyle]}>
      <View style={[styles.sweepLine, { height: radius }]} />
    </Animated.View>
  );
}

export default FindingMatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#3d3442',
    fontWeight: '600',
    marginBottom: 30,
  },
  radarWrapper: {
    width: RADAR_RADIUS * 2,
    height: RADAR_RADIUS * 2,
    borderRadius: RADAR_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#f89b4c',
  },
  sweep: {
    position: 'absolute',
    width: RADAR_RADIUS * 2,
    height: RADAR_RADIUS * 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sweepLine: {
    width: 2,
    height: RADAR_RADIUS,
    backgroundColor: '#FF7B00',
  },
  avatarWrapper: {
    position: 'absolute',
    top: RADAR_RADIUS - AVATAR_SIZE / 2,
    left: RADAR_RADIUS - AVATAR_SIZE / 2,
  },
  avatar: {
    position: 'absolute',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#fff',
  },
});
