import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';

const width = Dimensions.get('screen').width;

const VideoPlayer = ({videoUrl, isCancel, onCancelPress}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoPlayer = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLoad = ({duration}) => {
    setDuration(duration);
    setIsLoading(false);
  };

  const handleProgress = ({currentTime}) => {
    setCurrentTime(currentTime);
  };

  const handleFullScreen = () => {
    videoPlayer.current.presentFullscreenPlayer();
  };

  const handleSliderChange = value => {
    videoPlayer.current.seek(value);
    setCurrentTime(value);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoUrl}}
        ref={videoPlayer}
        style={styles.videoPlayer}
        resizeMode="cover"
        onLoad={handleLoad}
        onProgress={handleProgress}
        paused={!isPlaying}
      />
      {/* cancel button */}
      {isCancel && (
        <TouchableOpacity
          onPress={onCancelPress}
          style={styles.cancelBtn}
          activeOpacity={0.6}>
          <Icon name="cancel" size={30} color={Colors.primary} />
        </TouchableOpacity>
      )}

      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={30} color={Colors.primary} />
          <Text style={{color: Colors.white, fontSize: 16}}>Loading...</Text>
        </View>
      )}
      {!isLoading && (
        <View style={styles.controls}>
          <TouchableWithoutFeedback onPress={handlePlayPause}>
            <View style={styles.playPauseButton}>
              {isPlaying ? (
                <Icon
                  name="pause-circle-filled"
                  size={30}
                  color={Colors.primary}
                />
              ) : (
                <Icon
                  name="play-circle-fill"
                  size={30}
                  color={Colors.primary}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={handleSliderChange}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="white"
            thumbTintColor="white"
          />
          <Text style={styles.time}>
            {Math.floor(currentTime / 60)}:
            {('0' + Math.floor(currentTime % 60)).slice(-2)} /{' '}
            {Math.floor(duration / 60)}:
            {('0' + Math.floor(duration % 60)).slice(-2)}
          </Text>
          <TouchableWithoutFeedback onPress={handleFullScreen}>
            <View style={styles.fullScreenButton}>
              <Icon name="fullscreen" size={30} color={Colors.primary} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 15,
  },
  videoPlayer: {
    width: width - 50,
    height: 240,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  time: {
    color: Colors.primary,
  },
  playPauseButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 15,
  },
  fullScreenButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 25,
  },
  cancelBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 5,
    marginTop: 5,
    zIndex: 111111,
  },
});

export default VideoPlayer;
