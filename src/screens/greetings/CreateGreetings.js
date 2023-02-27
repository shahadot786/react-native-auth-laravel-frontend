import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Heading from '../../components/Heading';
import GreetingsDataCard from '../../components/greetings/GreetingsDataCard';
import BackArrow from '../../components/BackArrow';
import {useNavigation} from '@react-navigation/native';

const CreateGreetings = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* back arrow */}
      <BackArrow visibility={true} onPressBack={() => navigation.goBack()} />
      {/* heading */}
      <View style={styles.heading}>
        <Heading color={Colors.white}>Create Greetings</Heading>
      </View>
      <GreetingsDataCard />
    </ScrollView>
  );
};

export default CreateGreetings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  heading: {
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 10,
  },
});
