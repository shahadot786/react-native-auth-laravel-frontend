import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Heading from '../../components/Heading';
import GreetingsDataCard from '../../components/greetings/GreetingsDataCard';

const CreateGreetings = () => {
  return (
    <ScrollView style={styles.container}>
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
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 10,
  },
});
