import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>HomeScreen</Text>
    </ScrollView>
  );
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});