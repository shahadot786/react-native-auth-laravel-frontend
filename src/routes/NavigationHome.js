import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import TabNavigation from './TabNavigation';
import RouteName from '../constants/RouteName';
import GreetingsScreen from '../screens/home/GreetingsScreen';
import {AuthContext, getToken, getUserData} from '../auth/auth';

const Stack = createNativeStackNavigator();

const NavigationHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
        const user = await getUserData(token);
        setUserData(user);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <AuthContext.Provider value={{isLoggedIn, userData, setIsLoggedIn}}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <Stack.Screen
                name={RouteName.signIn}
                component={SignInScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={RouteName.signUp}
                component={SignUpScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default NavigationHome;
