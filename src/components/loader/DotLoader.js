import React from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../../constants/Colors';

const DotLoader = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Animatable.View
        animation="bounceIn"
        iterationCount="infinite"
        style={{
          backgroundColor: Colors.gray,
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: 10,
        }}
      />
      <Animatable.View
        animation="bounceOut"
        iterationCount="infinite"
        style={{
          backgroundColor: Colors.gray,
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: 10,
        }}
      />
      <Animatable.View
        animation="bounceIn"
        iterationCount="infinite"
        style={{
          backgroundColor: Colors.gray,
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: 10,
        }}
      />
    </View>
  );
};

export default DotLoader;
