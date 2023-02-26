import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import TabNavigation from './TabNavigation';
import RouteName from '../constants/RouteName';
import GreetingsScreen from '../screens/home/GreetingsScreen';

const Stack = createNativeStackNavigator();

const NavigationHome = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteName.signUp}
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteName.signIn}
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteName.bottomTab}
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteName.greetings}
          component={GreetingsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationHome;
