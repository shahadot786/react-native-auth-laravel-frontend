import React, {useState} from 'react';
import {StyleSheet, Text, View, PanResponder, Animated} from 'react-native';

const thumbSize = 40;
const trackWidth = 4;
const trackHeight = 180;
const trackBorderRadius = trackHeight / 2;

const CustomSlider = () => {
  const [value, setValue] = useState(50);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      let newValue = Math.round(
        ((value * 100) / 100 + gestureState.dy / trackHeight) * 100,
      );
      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > 100) {
        newValue = 100;
      }
      setValue(newValue);
    },
  });

  const trackFillHeight = (value / 100) * trackHeight;
  const trackEmptyHeight = trackHeight - trackFillHeight;

  const thumbPosition = Animated.multiply(
    Animated.divide(
      Animated.subtract(new Animated.Value(100), new Animated.Value(value)),
      new Animated.Value(100),
    ),
    new Animated.Value(trackHeight - thumbSize),
  );

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[
            styles.trackFill,
            {
              height: trackFillHeight,
              borderTopLeftRadius: trackBorderRadius,
              borderTopRightRadius: trackBorderRadius,
            },
          ]}
        />
        <View
          style={[
            styles.trackEmpty,
            {
              height: trackEmptyHeight,
              borderBottomLeftRadius: trackBorderRadius,
              borderBottomRightRadius: trackBorderRadius,
            },
          ]}
        />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.thumb, {bottom: thumbPosition}]}
      />
      <Text style={styles.sliderValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column'
  },
  track: {
    width: trackWidth,
    height: trackHeight,
    backgroundColor: '#DCDCDC',
    borderRadius: trackBorderRadius,
  },
  trackFill: {
    width: trackWidth,
    backgroundColor: 'blue',
  },
  trackEmpty: {
    width: trackWidth,
    backgroundColor: 'transparent',
  },
  thumb: {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: trackWidth,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CustomSlider;
