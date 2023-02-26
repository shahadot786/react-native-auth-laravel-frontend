import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../input/CustomInput';
import {useForm} from 'react-hook-form';
import Button from '../buttons/Button';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../constants/RouteName';
import {register} from '../../auth/auth';
import {CirclesLoader} from 'react-native-indicator';
import Colors from '../../constants/Colors';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpForm = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPressed = async data => {
    setIsLoading(true);
    const {name, email, phone, password, passwordConfirmation} = data;
    try {
      await register(name, email, phone, password, passwordConfirmation);
      navigation.navigate(RouteName.bottomTab);
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
          <CirclesLoader size={30} color={Colors.primary} dotRadius={5} />
        )}
      </View>
      <CustomInput
        iconName={'user'}
        name="name"
        placeholder="Your Name"
        control={control}
        rules={{
          required: 'Name is required',
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
        iconName={'phone'}
        name="phone"
        placeholder="Your Phone Number"
        control={control}
        rules={{
          required: 'Phone Number is required',
          minLength: {
            value: 8,
            message: 'Phone Number should be at least 8 characters long',
          },
          maxLength: {
            value: 11,
            message: 'Phone Number should be max 11 characters long',
          },
        }}
      />
      <CustomInput
        iconName={'lock'}
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
        iconName={'lock'}
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
  loading:{
    alignItems:'center'
  }
});
