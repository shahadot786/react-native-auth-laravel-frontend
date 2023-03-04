import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VideoUploadScreen from '../../util/VideoUploadScreen';

const VideoScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <VideoUploadScreen/>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
