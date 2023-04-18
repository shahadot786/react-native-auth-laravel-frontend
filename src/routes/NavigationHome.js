import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import TabNavigation from './TabNavigation';
import RouteName from '../constants/RouteName';
import {AuthContext, getToken, getUserData} from '../auth/auth';
import GreetingsScreen from '../screens/greetings/GreetingsScreen';
import AllGreetings from '../screens/greetings/AllGreetings';
import CreateGreetings from '../screens/greetings/CreateGreetings';
import GreetingsDetails from '../screens/greetings/GreetingsDetails';
import {View} from 'react-native';
import Spinner from '../components/spinner/Spinner';
import VideoCropperScreen from '../screens/greetings/VideoCropperScreen';
import AwsImageUploader from '../screens/AwsImageUploader';
import FileUploadList from '../screens/FileUploadList';
import AwsVideoUploader from '../screens/AwsVideoUploader';
import VideoUploadList from '../screens/GetS3Videos';

const Stack = createNativeStackNavigator();

const NavigationHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
        const user = await getUserData(token);
        setUserData(user);
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (!isLoading) {
    return (
      <View style={{flex: 1, backgroundColor: Colors.secondary}}>
        <Spinner />
      </View>
    );
  }
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
              <Stack.Screen
                name={RouteName.allGreetings}
                component={AllGreetings}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={RouteName.createGreetings}
                component={CreateGreetings}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={RouteName.detailsGreetings}
                component={GreetingsDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={RouteName.cropper}
                component={VideoCropperScreen}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={RouteName.fileList}
                component={FileUploadList}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={RouteName.fileUpload}
                component={AwsImageUploader}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={RouteName.videoUpload}
                component={AwsVideoUploader}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={RouteName.uploadList}
                component={VideoUploadList}
                options={{headerShown: false}}
              />
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
