import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../constants/Colors';

const CheckBoxContainer = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <CheckBox
        value={isSelected}
        onValueChange={setSelection}
        style={styles.checkbox}
        tintColors={{true: Colors.primary, false: Colors.primary}}
      />
      <Text style={styles.label}>Remember Me</Text>
    </View>
  );
};

export default CheckBoxContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label:{
    textAlign:'center',
    marginTop:5,
    color:Colors.white
  }
});
