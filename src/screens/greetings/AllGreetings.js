import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackArrow from '../../components/BackArrow';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../components/Heading';
import GreetingsProvider from '../../context/GreetingsProvider';
import GreetingsDataCard from '../../components/greetings/GreetingsDataCard';

const AllGreetings = () => {
  const navigation = useNavigation();
  return (
    <GreetingsProvider>
      <View style={styles.container}>
        {/* back arrow */}
        <BackArrow visibility={true} onPressBack={() => navigation.goBack()} />
        {/* heading */}
        <View style={styles.heading}>
          <Heading color={Colors.white}>All Greetings</Heading>
        </View>
        <View style={styles.greetings}>
          <GreetingsDataCard />
        </View>
      </View>
    </GreetingsProvider>
  );
};

export default AllGreetings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  heading: {
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 10,
  },
  greetings: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
