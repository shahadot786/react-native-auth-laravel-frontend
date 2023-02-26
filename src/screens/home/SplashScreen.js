import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Image View */}
      <View>
        <Image source={Images.logo} />
      </View>
      {/* Get started view */}
      <View>
        <Text>Virtual Tour</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
