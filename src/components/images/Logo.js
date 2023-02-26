import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';

const Logo = ({dimension}) => {
  return (
    <View style={[styles.imageView, {width: dimension, height: dimension}]}>
      <Image style={styles.image} source={Images.logo} />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
