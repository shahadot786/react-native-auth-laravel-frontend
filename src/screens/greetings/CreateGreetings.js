import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Heading from '../../components/Heading';
import BackArrow from '../../components/BackArrow';
import {useNavigation} from '@react-navigation/native';
import GreetingsForm from '../../components/Form/GreetingsForm';

const CreateGreetings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* back arrow */}
      <BackArrow
        iconName={'ios-arrow-back'}
        visibility={true}
        onPressBack={() => navigation.goBack()}
      />
      {/* heading */}
      <View style={styles.heading}>
        <Heading color={Colors.white}>Create Greetings</Heading>
      </View>
      {/* form */}
      <GreetingsForm />
    </View>
  );
};

export default CreateGreetings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  heading: {
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 10,
    marginBottom: 20,
  },
});
