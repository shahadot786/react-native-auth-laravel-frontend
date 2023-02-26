import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/buttons/Button';
import {useNavigation} from '@react-navigation/native';
import CheckBoxContainer from '../../components/CheckBoxContainer';
import RouteName from '../../constants/RouteName';
import CustomInput from '../../components/input/CustomInput';
import {useForm} from 'react-hook-form';
import {login} from '../../auth/auth';
import {CirclesLoader} from 'react-native-indicator';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignInForm = () => {
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPressed = async data => {
    setIsLoading(true);
    const {password, email} = data;
    try {
      await login(email, password);
      navigation.replace(RouteName.bottomTab);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.input}>
      <View style={styles.loading}>
        {isLoading && (
          <CirclesLoader size={30} color={Colors.primary} dotRadius={5} />
        )}
      </View>

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
      {/* forgot pass */}
      <View style={styles.forgot}>
        <CheckBoxContainer />
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.label}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      {/* Buttons */}
      <View style={styles.button}>
        <Button
          textColor={Colors.white}
          onPress={() => navigation.navigate(RouteName.signUp)}>
          SIGN UP
        </Button>
        <Button
          backgroundColor={Colors.primary}
          textColor={Colors.black}
          onPress={handleSubmit(onSignInPressed)}>
          LOGIN
        </Button>
      </View>
    </View>
  );
};

export default SignInForm;
const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  forgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  label: {
    color: Colors.white,
    marginTop: 5,
  },
  loading: {
    alignItems: 'center',
  },
});
