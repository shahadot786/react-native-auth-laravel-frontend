import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../components/BackArrow';
import VideoPlayer from '../../components/Video/VideoPlayer';
import Heading from '../../components/Heading';
import Colors from '../../constants/Colors';

const VideoCropperScreen = ({route, navigation}) => {
  const path = route.params.videoPath;
  return (
    <View style={styles.container}>
      {/* back */}
      <View>
        <BackArrow
          iconName={'close-circle'}
          visibility={true}
          onPressBack={() => navigation.goBack()}
        />
      </View>
      {/* content */}
      <View>
        <Heading color={Colors.white}>Crop Video</Heading>
        <VideoPlayer videoUrl={path} />
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
