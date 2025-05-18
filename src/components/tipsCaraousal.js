import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient'; // or from 'expo-linear-gradient' if using Expo
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import theme from '../../theme';

const { width } = Dimensions.get('window');

// Gradient colors for each slide
const data = [
    {
        title: 'Get Chat Tips',
        subtitle: 'Learn how to start a good conversation',
        icon: require('../assets/circle.png'),
        colors: ['#ffe5cd', '#ffe5cd', '#ffe5cd'],
    },
    {
        title: 'Add your interests',
        subtitle: 'Let others know what you like',
        icon: require('../assets/interests.png'),
        colors: ['#d0aae5', '#d0aae5'],
    },
    {
        title: 'Stay Safe',
        subtitle: 'Read community guidelines',
        icon: require('../assets/security.png'),
        colors: ['#f8cc82', '#f8cc82'],
    },
];

const MyCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={width / responsiveWidth(1.3)}
                autoPlay
                data={data}
                onSnapToItem={(index) => setActiveIndex(index)}
                scrollAnimationDuration={1000}
                renderItem={({ index }) => (
                    <LinearGradient
                        colors={data[index].colors}
                        style={styles.card}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2.5), paddingHorizontal: responsiveWidth(3), }}>
                            <Image
                                source={data[index].icon}
                                style={{ width: responsiveWidth(10), height: responsiveWidth(10) }} />
                            <View style={{ display: 'flex', flexDirection: 'column', }}>
                                <Text style={styles.text}>{data[index].title}</Text>
                                <Text style={styles.subtitleText}>{data[index].subtitle}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                )}
            />
            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i === activeIndex ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: responsiveWidth(3),
    },
    card: {
        flex: 1,
        borderRadius: responsiveWidth(2.5),
        marginHorizontal: responsiveFontSize(1.5),
        justifyContent: 'center',
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: '#000',
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: responsiveFontSize(1.5),
        color: theme.colors.dark,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: responsiveWidth(2),
    },
    dot: {
        width: responsiveWidth(1.5),
        height: responsiveWidth(1.5),
        borderRadius: responsiveWidth(10),
        marginHorizontal: responsiveWidth(1.3),
    },
    activeDot: {
        backgroundColor: '#000',
    },
    inactiveDot: {
        backgroundColor: '#ccc',
    },
});

export default MyCarousel;
