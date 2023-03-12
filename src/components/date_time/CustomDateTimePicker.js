import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomDateTimePicker = ({
  open,
  setOpen,
  date,
  setDate,
  updatedDate,
  updatedTime,
}) => {
  return (
    <View>
      <View style={[styles.button, styles.rowView]}>
        <Text style={{color: Colors.primary}}>Select Date & Time:</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => setOpen(true)}>
          <Icon name="calendar" size={22} color={Colors.white} />
        </TouchableOpacity>
        {date && (
          <>
            <Text style={{color: Colors.white}}>{updatedDate}</Text>
            <Text style={{color: Colors.white}}>{updatedTime}</Text>
          </>
        )}
      </View>
      {/* date picker */}
      <DatePicker
        modal
        is24hourSource={false}
        open={open}
        date={date}
        theme="dark"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
  },
  rowView: {
    flexDirection: 'row',
    gap: 20,
  },
});
