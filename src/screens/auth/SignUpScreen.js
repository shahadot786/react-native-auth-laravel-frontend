import {StyleSheet, ScrollView, View, Text} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Heading from '../../components/Heading';
import SignUpForm from '../../components/Form/SignUpForm';
import Logo from '../../components/images/Logo';
import * as Animatable from 'react-native-animatable';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animatable.View
        animation={'pulse'}
        iterationCount="infinite"
        style={{alignItems: 'center'}}>
        <Logo dimension={100} />
      </Animatable.View>
      {/* Header */}
      <ScrollView style={styles.header} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Heading color={Colors.primary}>SIGN UP</Heading>
        {/* Input Form */}
        <SignUpForm />
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    backgroundColor: Colors.black,
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 15,
    paddingTop: 25,
    paddingHorizontal: 25,
  },

  error: {
    marginLeft: 10,
    color: Colors.danger,
  },
});
