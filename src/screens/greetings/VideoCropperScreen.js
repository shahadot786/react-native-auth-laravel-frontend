import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../components/BackArrow';
import Heading from '../../components/Heading';
import Colors from '../../constants/Colors';
import CropperVideoPlayer from './CropperVideoPlayer';
import {FFmpegKit} from 'ffmpeg-kit-react-native';

const VideoCropperScreen = ({route, navigation}) => {
  const path = route.params.videoPath;
  const {onTrimVideo} = route.params;

  const handleTrimVideo = trimmedVideoPath => {
    onTrimVideo(trimmedVideoPath);
    navigation.goBack();
  };
  const cancelHandler = () => {
    FFmpegKit.cancel();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* back */}
      <View>
        <BackArrow
          iconName={'close-circle'}
          visibility={true}
          onPressBack={cancelHandler}
        />
      </View>
      {/* content */}
      <View>
        <CropperVideoPlayer videoUrl={path} onTrimVideo={handleTrimVideo} />
      </View>
    </View>
  );
};

export default VideoCropperScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
});
