import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SettingsIcon from './images/SettingsIcon';
import NotificationIcon from './images/NotificationIcon';

const UsersIcons = () => {
  return (
    <View style={styles.container}>
      <SettingsIcon />
      <NotificationIcon />
    </View>
  );
};

export default UsersIcons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
    alignItems: 'center',
  },
});
