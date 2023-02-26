import {StyleSheet, View} from 'react-native';
import React from 'react';
import Card from './Card';
import CardData from '../../util/CardData';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../../constants/RouteName';

const CardPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {CardData.map(data => {
        return (
          <Card
            key={data.id}
            backgroundImage={data.backgroundImage}
            cardImage={data.cardImage}
            title={data.title}
            onPress={() =>
              navigation.navigate(RouteName.greetings, {greetingData: data})
            }
          />
        );
      })}
    </View>
  );
};

export default CardPage;

const styles = StyleSheet.create({
  container: {
    top: -50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    justifyContent: 'center',
    rowGap: 8,
    columnGap:25
  },
});
