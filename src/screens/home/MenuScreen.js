import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MenuScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>HomeScreen</Text>
    </ScrollView>
  );
}

export default MenuScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});