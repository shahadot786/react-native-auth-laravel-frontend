import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import BackArrow from '../../components/BackArrow';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../components/Heading';

const AllGreetings = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* back arrow */}
      <BackArrow visibility={true} onPressBack={() => navigation.goBack()} />
      {/* heading */}
      <View style={styles.heading}>
        <Heading color={Colors.white}>All Greetings</Heading>
      </View>
    </ScrollView>
  );
};

export default AllGreetings;

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
