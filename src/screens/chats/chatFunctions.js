import React from 'react';
import { Animated } from 'react-native';

const ChatFunctions = () => {
  const createMessage = (text, isSender = true) => {
    const anim = new Animated.Value(0);
    return {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender,
      animation: anim,
    };
  };

  const animateMessage = (message, flatListRef, delay = 100) => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
      Animated.timing(message.animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, delay);
  };

  const getRandomReply = () => {
    const dummyReplies = [
      'Nice to hear that!',
      'Interesting...',
      'Tell me more!',
      'Haha, really?',
      'That’s cool!',
    ];
    const randomIndex = Math.floor(Math.random() * dummyReplies.length);
    return dummyReplies[randomIndex];
  };

  return {
    getRandomReply,
    animateMessage,
    createMessage,
  };
};

export default ChatFunctions;
