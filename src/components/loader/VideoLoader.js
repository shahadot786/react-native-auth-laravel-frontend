import {View, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Images from '../../constants/Images';

const VideoLoader = () => {
  return (
    <View style={styles.loading}>
      <FastImage
        source={Images.loadingGif}
        style={{width: 40, height: 40}}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default VideoLoader;
