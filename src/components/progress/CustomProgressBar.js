import {Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';

const CustomProgressBar = ({progressBar, progress, totalSize, currentSize}) => {
  return (
    <View style={{gap: 15, justifyContent: 'center', alignItems: 'center'}}>
      {/* <ActivityIndicator size="large" color={Colors.primary} /> */}
      <Progress.Bar
        progress={progressBar}
        width={200}
        height={10}
        color={Colors.primary}
      />
      <Text
        style={{
          color: Colors.primary,
          fontSize: 20,
          marginTop: 5,
          fontWeight: 'bold',
        }}>
        {Math.round(progress)}%
      </Text>
      {/* <Text style={{color: Colors.white, fontSize: 20}}>
                Size: {(totalSize / 1000000).toFixed(2)} MB
              </Text> */}
      <Text style={{color: Colors.green, fontSize: 15}}>
        Uploaded:{(totalSize / 1000000).toFixed(2)} MB /{' '}
        {(currentSize / 1000000).toFixed(2)} MB
      </Text>
    </View>
  );
};

export default CustomProgressBar;
