import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import multiavatar from '@multiavatar/multiavatar';
import { SvgXml } from 'react-native-svg';
import { getAuth } from '@react-native-firebase/auth';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import theme from '../../theme';
import { getFirestore } from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
export default function DrawerContent(props) {
    const [firstName, setFirstName] = useState('User');
    const [email, setEmail] = useState('');
    const uid = getAuth().currentUser?.uid;
    const svgCode = multiavatar(uid);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (uid) {
                    const userDoc = await getFirestore().collection('users').doc(uid).get();
                    if (userDoc.exists) {
                        const data = userDoc.data();
                        setFirstName(data.firstName || 'User');
                        setEmail(data.email || '');
                    }
                }
            } catch (error) {
                console.log('Error fetching user data', error);
            }
        };
        fetchUserData();
    }, [uid]);

    const handleSignOut = () => {
        getAuth().signOut();
    };

    const drawerItems = [
        {
            label: 'Home',
            icon: 'home',
            iconType: 'material',
            screenName: 'Home',
        },
        {
            label: 'My Profile',
            icon: 'account-circle',
            iconType: 'material',
            screenName: 'My Profile',
        },
        {
            label: 'Notifications',
            icon: 'notifications',
            iconType: 'material',
            screenName: 'Notifications',
            badge: 12,
        },
        {
            label: 'Settings',
            icon: 'settings',
            iconType: 'material',
            screenName: 'Settings',
        },
        {
            label: 'Favorites',
            icon: 'heart',
            iconType: 'feather',
            screenName: 'Favorites',
        },
        {
            label: 'Help Center',
            icon: 'help-circle',
            iconType: 'feather',
            screenName: 'Support',
        },
    ];

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[
                    styles.avatarContainer,
                ]}
            >
                <View style={styles.avatarWrapper}>
                    <SvgXml
                        xml={svgCode}
                        width={responsiveWidth(22)}
                        height={responsiveWidth(22)}
                    />
                </View>
                <Text style={styles.username}>Hello, {firstName}!</Text>
                {email && <Text style={styles.email}>{email}</Text>}
            </View>

            <View style={styles.divider} />

            <View style={styles.drawerList}>
                {drawerItems.map((item, index) => (
                    <DrawerItem
                        key={index}
                        label={({ focused, color }) => (
                            <View style={styles.labelContainer}>
                                {item.iconType === 'material' && (
                                    <MaterialIcons
                                        name={item.icon}
                                        size={responsiveFontSize(2.9)}
                                        color={color}
                                        style={styles.icon}
                                    />
                                )}
                                {item.iconType === 'feather' && (
                                    <Feather
                                        name={item.icon}
                                        size={responsiveFontSize(2.9)}
                                        color={color}
                                        style={styles.icon}
                                    />
                                )}
                                <Text style={[styles.drawerLabel, { color }]}>
                                    {item.label}
                                </Text>
                                {item.badge && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.badge}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                        onPress={() => props.navigation.navigate(item.screenName)}
                        activeTintColor={theme.colors.primaryLight}
                        inactiveTintColor={theme.colors.text}
                        activeBackgroundColor={theme.colors.primaryLight + '20'}
                        style={styles.drawerItem}
                        pressColor={theme.colors.primaryLight + '40'}
                    />
                ))}
            </View>

            <View style={styles.divider} />

            <DrawerItem
                label={({ color }) => (
                    <View style={styles.labelContainer}>
                        <MaterialIcons name="logout" size={responsiveFontSize(2.4)} color={'#d32f2f'} style={styles.icon} />
                        <Text style={[styles.drawerLabel, { color }]}>Sign Out</Text>
                    </View>
                )}
                onPress={handleSignOut}
                inactiveTintColor={'#d32f2f'}
                style={styles.drawerItem}
                pressColor={'#d32f2f' + '40'} // Ripple effect color
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}>v1.0.0</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: responsiveHeight(5),
        backgroundColor: theme.colors.background,
    },
    icon: {
        marginRight: responsiveWidth(3),
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(5),
    },
    avatarWrapper: {
        backgroundColor: '#fff',
        borderRadius: responsiveWidth(50),
        padding: responsiveWidth(1),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    username: {
        marginTop: responsiveWidth(2),
        fontSize: responsiveFontSize(2.3),
        color: '#666666',
        fontWeight: '600',
        fontFamily: 'sans-serif-medium',
    },
    drawerList: {
        flex: 1,
        marginTop: responsiveWidth(1),
    },
    drawerItem: {
        borderRadius: responsiveWidth(2),
        marginHorizontal: responsiveWidth(2),
        marginVertical: responsiveWidth(0.1),
        overflow: 'hidden',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerLabel: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        marginLeft: responsiveWidth(4),
        flex: 1,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#e0e0e0',
        marginVertical: responsiveWidth(1.5),
        marginHorizontal: responsiveWidth(4),
    },
    footer: {
        alignItems: 'center',
        paddingBottom: responsiveWidth(2),
    },
    footerText: {
        fontSize: responsiveFontSize(1.5),
        color: theme.colors.secondaryText,
    },
    badge: {
        backgroundColor: theme.colors.primary,
        borderRadius: responsiveWidth(3),
        paddingHorizontal: responsiveWidth(1.5),
        paddingVertical: responsiveWidth(0.5),
        marginLeft: responsiveWidth(2),
    },
    badgeText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.5),
        fontWeight: 'bold',
    },
});