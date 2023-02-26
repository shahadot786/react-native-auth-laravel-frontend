import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import HeaderPage from '../../components/HeaderPage';
import CardPage from '../../components/card/CardPage';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <HeaderPage />
      <CardPage />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
