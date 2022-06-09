import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import Constants from 'expo-constants';

import IconGames from './assets/icon-games.png';
import IconGamesActive from './assets/icon-games-active.png';
import IconTech from './assets/icon-tech.png';
import IconTechActive from './assets/icon-tech-active.png';
import TlmLogo from './assets/tlm-logo.png';

import SplashScreen from './screen/SplashScreen';
import ArticleScreen from './screen/ArticleScreen';
import GamesScreen from './screen/GamesScreen';
import TechScreen from './screen/TechScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
      <Tab.Navigator labeled={false} activeColor="#eee" screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen name="Game" component={GamesScreen} options={{
          tabBarIcon: ({focused, color, size}) => (
            focused 
            ? <Image style={{height: 35, width: 35}} source={IconGamesActive} />
            : <Image style={{height: 24, width: 24}} source={IconGames} />
          ),
          headerTitle: (props) => {
            return (
              <View>
                <Image style={{height: 35, width: 110}} source={TlmLogo} />
              </View>
            )
          }
        }}/>
        <Tab.Screen name="Tech" component={TechScreen} options={{
          tabBarIcon: ({focused, color, size}) => (
            focused 
            ? <Image style={{height: 35, width: 35}} source={IconTechActive} />
            : <Image style={{height: 24, width: 24}} source={IconTech} />
          ),
          headerTitle: (props) => {
            return (
              <View>
                <Image style={{height: 35, width: 110}} source={TlmLogo} />
              </View>
            )
          }
        }}/>
      </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Splash" component={SplashScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeStack} />
        <Stack.Screen options={{title: '', headerShadowVisible: false}} 
          name="Article" component={ArticleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;