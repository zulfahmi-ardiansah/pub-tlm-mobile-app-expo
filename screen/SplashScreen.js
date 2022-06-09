import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, Text, ScrollView, View, Dimensions, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

import TlmLogo from '../assets/tlm-logo.png';
import Preloader from '../assets/preloader.gif';

const SplashScreen = ({navigation}) => {
  const opacityLogo = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityLogo, {
      toValue: 1,
      duration: 1000
    }).start();
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);
  }, [])
      
  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: opacityLogo}}>
        <Image style={{height: 60, width: 180}} source={TlmLogo} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
});

export default SplashScreen;