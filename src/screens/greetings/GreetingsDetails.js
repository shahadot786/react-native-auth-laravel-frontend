import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import BackArrow from '../../components/BackArrow';

const GreetingsDetails = ({route, navigation}) => {
  const data = route.params.greetingsData;
  return (
    <ScrollView style={styles.container}>
      <View>
        <BackArrow visibility={true} onPressBack={() => navigation.goBack()} />
      </View>
      <Text>{data.title}</Text>
    </ScrollView>
  );
};

export default GreetingsDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
  },
});
