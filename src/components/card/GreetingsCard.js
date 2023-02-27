import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const GreetingsCard = ({icon, title, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}>
      <Icon name={icon} size={32} color={Colors.black} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default GreetingsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: Colors.primary,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 15,
    gap: 10,
  },
  text: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
