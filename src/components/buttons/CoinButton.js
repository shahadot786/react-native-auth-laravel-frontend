import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';
import Colors from '../../constants/Colors';

const CoinButton = ({coinValue}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: Colors.white}}>{coinValue}</Text>
      <Image style={styles.image} source={Images.coin} />
    </View>
  );
};

export default CoinButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2E43',
    paddingHorizontal: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    top:44,
    left:-50
  },
  image: {
    width: 20,
    height: 20,
  },
});
