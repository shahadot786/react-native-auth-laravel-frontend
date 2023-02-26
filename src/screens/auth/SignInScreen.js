import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Logo from '../../components/images/Logo';
import Heading from '../../components/Heading';
import SignInForm from '../../components/Form/SignInForm';
import * as Animatable from 'react-native-animatable';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animatable.View
        animation={'pulse'}
        iterationCount="infinite"
        style={{alignItems: 'center', marginTop: 60}}>
        <Logo dimension={150} />
      </Animatable.View>
      {/* Header */}
      <ScrollView style={styles.header} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View>
          <Heading color={Colors.primary}>SIGN IN</Heading>
        </View>
        {/* Sign In Form */}
        <SignInForm />
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

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
    marginTop: 100,
    paddingTop: 25,
    paddingHorizontal: 25,
  },
});
