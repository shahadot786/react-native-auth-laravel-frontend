import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  iconName,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <Text style={styles.text}>{name}</Text>
          <Animatable.View
            animation={error && 'shake'}
            style={[
              styles.container,
              {borderColor: error ? 'red' : Colors.primary},
            ]}>
            <Icon
              style={styles.inputIcon}
              name={iconName}
              size={20}
              color={Colors.primary}
            />
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={Colors.gray}
            />
          </Animatable.View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch', marginLeft: 10}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
    borderRadius: 25,
    marginBottom: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    paddingTop: 4,
    paddingBottom: 4,
    color: Colors.white,
  },
  text: {
    color: Colors.primary,
    marginLeft: 10,
    marginTop: 15,
    textTransform: 'capitalize',
  },
  inputIcon: {
    padding: 8,
    marginHorizontal: 2,
  },
});

export default CustomInput;
