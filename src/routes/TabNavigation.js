import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationScreen from '../screens/home/NotificationScreen';
import MenuScreen from '../screens/home/MenuScreen';
import Colors from '../constants/Colors';
import RouteName from '../constants/RouteName';
import * as Animatable from 'react-native-animatable';
import VideoScreen from '../screens/home/VideoScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          paddingHorizontal: 0,
          paddingTop: 4,
          paddingBottom: 6,
          backgroundColor: Colors.secondary,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.white,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
          margin: 0,
        },
      }}>
      <Tab.Screen
        name={RouteName.home}
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color}) => {
            return (
              <Animatable.View
                animation={focused ? 'pulse' : null}
                iterationCount="infinite"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 1,
                }}>
                <Icon name="home" color={color} size={26} />
                <Text
                  className="items-center justify-center"
                  style={{
                    color: color,
                    fontSize: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  Home
                </Text>
              </Animatable.View>
            );
          },
        }}
      />
      {/* <Tab.Screen name="Featured" component={Featured} /> */}
      <Tab.Screen
        name={RouteName.notification}
        component={NotificationScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color}) => {
            return (
              <Animatable.View
                animation={focused ? 'pulse' : null}
                iterationCount="infinite"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 1,
                }}>
                <Icon name="notifications" color={color} size={26} />
                <Text
                  className="items-center justify-center"
                  style={{
                    color: color,
                    fontSize: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  Notification
                </Text>
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteName.menu}
        component={MenuScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color}) => {
            return (
              <Animatable.View
                animation={focused ? 'pulse' : null}
                iterationCount="infinite"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 1,
                }}>
                <Icon name="list" color={color} size={26} />
                <Text
                  className="items-center justify-center"
                  style={{
                    color: color,
                    fontSize: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  Menu
                </Text>
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteName.video}
        component={VideoScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color}) => {
            return (
              <Animatable.View
                animation={focused ? 'pulse' : null}
                iterationCount="infinite"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 1,
                }}>
                <Icon name="play-circle" color={color} size={26} />
                <Text
                  className="items-center justify-center"
                  style={{
                    color: color,
                    fontSize: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  Video
                </Text>
              </Animatable.View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  animIcon: {
    transform: [{scale: 1}],
    transition: 'transform 0.2s ease-out',
  },
});
