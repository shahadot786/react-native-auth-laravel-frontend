import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const Button = ({children, backgroundColor, textColor, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.button, {backgroundColor: backgroundColor}]}>
      <Text style={{color: textColor, fontWeight: 500}}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 55,
    paddingVertical: 5,
  },
});
