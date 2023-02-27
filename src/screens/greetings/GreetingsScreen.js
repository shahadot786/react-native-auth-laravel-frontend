import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import CardHeader from '../../components/card/CardHeader';
import GreetingsCard from '../../components/card/GreetingsCard';
import {View} from 'react-native-animatable';
import RouteName from '../../constants/RouteName';

const GreetingsScreen = ({route, navigation}) => {
  const data = route.params.greetingData;
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <CardHeader data={data} navigation={navigation} />
      {/* Greetings */}
      <View style={styles.greetings}>
        <GreetingsCard
          icon={'list-circle-outline'}
          title={'All Greetings'}
          onPress={() => navigation.navigate(RouteName.allGreetings)}
        />
        <GreetingsCard
          icon={'add-circle-outline'}
          title={'Create Greetings'}
          onPress={() => navigation.navigate(RouteName.createGreetings)}
        />
      </View>
    </ScrollView>
  );
};

export default GreetingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  greetings: {
    marginVertical: 20,
  },
});
