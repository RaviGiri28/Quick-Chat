import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Svg, { Circle } from 'react-native-svg';
import theme from '../../theme';

const CircularProgressBar = ({ radius = 50, strokeWidth = 10, progress = 0.6, bgColor = '#e0e0e0' }) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress * circumference);
  const dynamicStrokeColor = progress >= 1 ? '#4caf50' : '#ff9800'; // green or orange
  const percentage = Math.round(progress * 100);

  return (
    <View>
      <Svg height={radius * 2} width={radius * 2}>
        {/* Background circle */}
        <Circle
          stroke={bgColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <View style={styles.centeredTextContainer}>
        <Circle
          stroke={dynamicStrokeColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredTextContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize:responsiveFontSize(theme.fonts.small),
    fontWeight:'600',
    color: '#000',
  },
});
export default CircularProgressBar;
