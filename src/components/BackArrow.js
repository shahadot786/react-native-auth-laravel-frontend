import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const BackArrow = ({visibility = false, onPressBack, iconName}) => {
  return (
    <>
      {visibility && (
        <View style={styles.arrow}>
          <TouchableOpacity activeOpacity={0.6} onPress={onPressBack}>
            <Icon
              name={iconName}
              size={28}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default BackArrow;

const styles = StyleSheet.create({
  arrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
