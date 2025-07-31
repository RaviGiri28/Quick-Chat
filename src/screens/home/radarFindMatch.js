import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {useSharedValue,useAnimatedStyle,withRepeat,withTiming,Easing,} from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import multiavatar from '@multiavatar/multiavatar';

const { width } = Dimensions.get('window');
const RADAR_RADIUS = width * 0.4;
const AVATAR_SIZE = 30;
// OrbitingAvatar with inline SVG
const OrbitingAvatar = ({ svg, radius, initialAngle = 0, clockwise = true, duration = 8000 }) => {
  const angle = useSharedValue(initialAngle);
  const scale = useSharedValue(1);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(initialAngle + (clockwise ? 2 * Math.PI : -2 * Math.PI), {
        duration,
        easing: Easing.linear,
      }),
      -1
    );

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
    <Animated.View style={[styles.avatarContainer, animatedStyle]}>
      <SvgXml xml={svg} width={AVATAR_SIZE} height={AVATAR_SIZE} />
    </Animated.View>
  );
};


// Radar Sweep
const RadarSweep = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1
    );
  }, []);

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  return (
    <Animated.View style={[styles.sweep, sweepStyle]}>
      <View style={styles.sweepLine} />
    </Animated.View>
  );
};


const RadarFindMatch = () => {
  const navigation = useNavigation();
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('chats');
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const generateAvatars = () => {
      const radii = [RADAR_RADIUS * 1, RADAR_RADIUS * 0.7, RADAR_RADIUS * 0.4];
      const avatarsPerOrbit = 2;
      return Array.from({ length: 10 }).map((_, i) => {
        const orbitIndex = Math.floor(i / avatarsPerOrbit);
        const seed = Math.random();
        return {
          svg: multiavatar(seed),
          radius: radii[orbitIndex],
          angle: Math.random() * 2 * Math.PI,
          clockwise: Math.random() < 0.5,
          duration: 5000 + Math.random() * 4000,
        };
      });
    };
    setAvatars(generateAvatars());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finding your partner to talk with...</Text>
      <View style={styles.radarWrapper}>
        {[1, 0.7, 0.4].map((f, i) => (
          <View
            key={i}
            style={[
              styles.ring,
              {
                width: RADAR_RADIUS * 2 * f,
                height: RADAR_RADIUS * 2 * f,
                borderRadius: RADAR_RADIUS * f,
              },
            ]}
          />
        ))}
        <RadarSweep />
        <View style={styles.avatarWrapper}>
          {avatars.map((a, i) => (
            <OrbitingAvatar
              key={i}
              svg={a.svg}
              radius={a.radius}
              initialAngle={a.angle}
              clockwise={a.clockwise}
              duration={a.duration}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
export default RadarFindMatch;
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
    top: RADAR_RADIUS,
    left: RADAR_RADIUS,
  },
  avatarContainer: {
    position: 'absolute',
  },
});
