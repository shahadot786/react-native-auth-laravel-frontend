import {StyleSheet, View} from 'react-native';
import React from 'react';
import Heading from '../components/Heading';
import {useForm} from 'react-hook-form';
import Button from '../components/buttons/Button';
import CustomInput from '../components/input/CustomInput';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const CustomFormValidation = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');

  const onSignInPressed = data => {
    console.log(data);
  };

  return (
    <View>
      <Heading>Form Validation</Heading>
      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 6,
            message: 'Username should be at least 6 characters long',
          },
          maxLength: {
            value: 24,
            message: 'Username should be max 24 characters long',
          },
        }}
      />
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should minimum 8 characters long',
          },
        }}
      />
      <CustomInput
        name="confirm-password"
        placeholder="Confirm Password"
        control={control}
        secureTextEntry
        rules={{
          validate: value => value === pwd || 'Password do not match',
        }}
      />
      <Button onPress={handleSubmit(onSignInPressed)}>Sign Up</Button>
    </View>
  );
};

export default CustomFormValidation;

const styles = StyleSheet.create({});
