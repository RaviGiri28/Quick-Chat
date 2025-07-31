import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { SvgXml } from 'react-native-svg';
import AddCoins from '../components/addcoins';
import theme from '../../theme';
import multiavatar from '@multiavatar/multiavatar';
import { getAuth } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
const ChatHeader = ({
  title,
  subtitle,
}) => {
  const uid = getAuth().currentUser?.uid;
  const svgCode = multiavatar(uid);
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: responsiveWidth(1) }}>
      <View style={styles.headerArea}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.grey }]}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.headerLeft}>
          <AddCoins />
          <Pressable onPress={() => navigation.openDrawer()}>
            <SvgXml
              xml={svgCode}
              width={responsiveWidth(10)}
              height={responsiveWidth(10)}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = {
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: responsiveFontSize(4),
    color: '#6e3f20',
    textAlign: 'center',
    fontFamily: 'cursive',
    fontWeight: '900'
  },
  subtitle: {
    fontSize: responsiveFontSize(theme.fonts.extraSmall),
    color: theme.colors.grey,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3.5),
  },
};

export default ChatHeader;