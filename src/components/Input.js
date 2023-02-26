import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import {Controller} from 'react-hook-form';

const Input = ({
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
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
        <View style={styles.container}>
          <Text style={styles.text}>{name}</Text>
          <View
            style={[
              styles.inputSection,
              {borderColor: error ? 'red' : Colors.primary},
            ]}>
            <Icon
              style={styles.inputIcon}
              name={iconName}
              size={20}
              color={Colors.primary}
            />
            <TextInput
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              autoComplete="off"
              placeholderTextColor={Colors.white}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </View>;
      }}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  text: {
    color: Colors.primary,
    marginLeft: 10,
    marginTop: 15,
  },
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    marginBottom: 5,
  },
  inputIcon: {
    padding: 10,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingTop: 2,
    paddingRight: 10,
    paddingBottom: 2,
    paddingLeft: 0,
    color: Colors.white,
  },
});
