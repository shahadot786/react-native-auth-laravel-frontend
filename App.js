import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import NavigationHome from './src/routes/NavigationHome';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main Home Navigation */}
      <NavigationHome />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
