import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Animated,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar
} from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
 const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', time: '10:00 AM', isSender: false },
    { id: '2', text: 'Hi, how are you?', time: '10:01 AM', isSender: true },
  ]);

  const handleSend = () => {
  if (!message.trim()) return;

  const anim = new Animated.Value(0);

  const newMessage = {
    id: Date.now().toString(),
    text: message,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSender: true,
    animation: anim,
  };

  setMessages(prev => [...prev, newMessage]);
  setMessage('');

  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: true });

    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, 100);

  // 🧠 Trigger dummy reply
  setTimeout(() => addDummyReply(), 1200);
};

const addDummyReply = () => {
  const anim = new Animated.Value(0);
  const dummyReplies = [
    'Nice to hear that!',
    'Interesting...',
    'Tell me more!',
    'Haha, really?',
    'That’s cool!',
  ];
  const randomText = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];

  const dummyMessage = {
    id: Date.now().toString() + '-reply',
    text: randomText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSender: false,
    animation: anim,
  };

  setMessages(prev => [...prev, dummyMessage]);

  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: true });

    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, 100);
};


   const renderItem = ({ item }) => {
  const animatedStyle = item.animation
    ? {
        opacity: item.animation,
        transform: [
          {
            translateY: item.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0],
            }),
          },
        ],
      }
    : {};

  const Bubble = (
    <View
      style={[
        styles.messageBubble,
        item.isSender ? styles.sender : styles.receiver,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );
  return item.animation ? (
    <Animated.View style={animatedStyle}>{Bubble}</Animated.View>
  ) : (
    Bubble
  );
}

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardShowListener = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(slideAnim, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [slideAnim]);

  return (
    <>
    <StatusBar barStyle={'dark-content'}/>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2)}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#333" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Stranger</Text>
            <View style={styles.activeRow}>
              <View style={styles.greenDot} />
              <Text style={styles.activeText}>Active</Text>
            </View>
          </View>
          </View>
        </View>
        <Icon name="dots-vertical" size={25} color="#333" />
      </View>
        <View style={styles.chatBody}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              paddingBottom: insets.bottom+10,
              marginBottom: slideAnim,
            },
          ]}
        >
          <TouchableOpacity style={styles.iconButton}>
          <Icon name="file-document" size={22} color="#6e3f20" />
        </TouchableOpacity>
          <TextInput 
          placeholder="Type a message..."           
          value={message} 
          onChangeText={setMessage}
          style={styles.input} />
          <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Icon name="send" size={22} color="#6e3f20" />
        </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveWidth(3),
    justifyContent: 'space-between',
    backgroundColor: '#ffecca',
    elevation: 4,
  },
   profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
   messageBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 12,
    position: 'relative',
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffdfaf',
    borderBottomRightRadius: 0,
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
   messageText: {
    fontSize: responsiveFontSize(2),
    color: '#3e260f',
  },
   timeText: {
    fontSize: responsiveFontSize(1.3),
    color: '#6e6e6e',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  avatar: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 100,
  },
  name: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: '#3e260f',
  },
  activeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeText: {
    fontSize: responsiveFontSize(1.6),
    color: 'green',
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: 'green',
    marginRight: 4,
  },
  chatBody: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    padding: responsiveWidth(2),
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 30,
    marginHorizontal: 10,
    fontSize: responsiveFontSize(2),
    borderColor: '#ddd',
    borderWidth: 1,
  },
   iconButton: {
    backgroundColor: '#ffe3c1',
    borderRadius: 30,
    padding: 10,
  },
});
