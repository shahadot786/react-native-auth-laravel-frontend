import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import CardHeader from '../../components/card/CardHeader';

const GreetingsScreen = ({route, navigation}) => {
  const data = route.params.greetingData;
  return (
    <ScrollView style={styles.container}>
      <CardHeader data={data} navigation={navigation} />
    </ScrollView>
  );
};

export default GreetingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
});
