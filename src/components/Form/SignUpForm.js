import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useContext, useState} from 'react';
import CustomInput from '../input/CustomInput';
import {useForm} from 'react-hook-form';
import Button from '../buttons/Button';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../constants/RouteName';
import {AuthContext, register} from '../../auth/auth';
import Colors from '../../constants/Colors';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpForm = () => {
  const {setIsLoggedIn} = useContext(AuthContext);
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPressed = async data => {
    setIsLoading(true);
    setIsLoggedIn(true);
    const {name, email, phone, password, passwordConfirmation} = data;
    try {
      await register(name, email, phone, password, passwordConfirmation);
      navigation.replace(RouteName.bottomTab);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };
  //end method

  return (
    <View style={styles.input}>
      <View style={styles.loading}>
        {isLoading && (
          <ActivityIndicator size={30} color={Colors.primary} />
        )}
      </View>
      <CustomInput
        iconName={'user'}
        name="name"
        placeholder="Your Name"
        control={control}
        rules={{
          required: 'Name is required',
          pattern: {
            value: /^[a-zA-Z ]*$/,
            message: 'Invalid Name. Use [A-Z or a-z]',
          },
          minLength: {
            value: 6,
            message: 'Name should be at least 6 characters long',
          },
          maxLength: {
            value: 40,
            message: 'Name should be max 40 characters long',
          },
        }}
      />
      <CustomInput
        iconName={'envelope'}
        name="email"
        placeholder="Your Email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomInput
        number
        name="phone"
        placeholder="Your Phone Number"
        control={control}
        rules={{
          required: 'Phone Number is required',
          minLength: {
            value: 11,
            message: 'Phone Number should be at least 11 characters long',
          },
          maxLength: {
            value: 20,
            message: 'Phone Number should be max 20 characters long',
          },
        }}
      />
      <CustomInput
        iconName={'lock'}
        //eye
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry
        rules={{
          required: 'Password is required',
          // pattern: {
          //   value:
          //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/i,
          //   message:
          //     'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
          // },
          minLength: {
            value: 3,
            message: 'Password should minimum 3 characters long',
          },
        }}
      />
      <CustomInput
        iconName={'lock'}
        //eye
        name="confirm-password"
        placeholder="Confirm Password"
        control={control}
        secureTextEntry
        rules={{
          validate: value => value === pwd || 'Password do not match',
        }}
      />
      {/* Buttons */}
      <View style={styles.button}>
        <Button
          textColor={Colors.white}
          onPress={() => navigation.navigate(RouteName.signIn)}>
          LOGIN
        </Button>
        <Button
          backgroundColor={Colors.primary}
          textColor={Colors.black}
          onPress={handleSubmit(onSignUpPressed)}>
          SIGN UP
        </Button>
      </View>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    marginTop: 25,
  },
  loading: {
    alignItems: 'center',
  },
});
