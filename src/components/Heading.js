import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const Heading = ({children, color}) => {
  return (
    <View style={styles.heading}>
      <Text style={[styles.text, {color: color}]}>{children}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
