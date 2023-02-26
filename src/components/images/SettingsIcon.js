import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';

const SettingsIcon = () => {
  return (
    <View style={styles.settings}>
      <Image style={styles.image} source={Images.setting} />
    </View>
  );
};

export default SettingsIcon;

const styles = StyleSheet.create({
  settings: {
    width: 25,
    height: 25,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
