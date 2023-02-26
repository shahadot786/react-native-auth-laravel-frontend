import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';


const Avatar = ({source}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    borderRadius: 75,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
