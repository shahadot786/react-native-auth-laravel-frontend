import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';

const NotificationIcon = () => {
  return (
    <View style={styles.notifications}>
      <Image style={styles.image} source={Images.notification} />
      <View style={styles.dot}></View>
    </View>
  );
};

export default NotificationIcon;

const styles = StyleSheet.create({
  notifications: {
    width: 22,
    height: 22,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    position: 'absolute',
    right: 0,
  },
});
