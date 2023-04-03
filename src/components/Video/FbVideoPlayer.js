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
const screenHeight = Dimensions.get('screen').height;

const FbVideoPlayer = ({videoUrl, isCancel, onCancelPress}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(false);
  const [hideControl, setHideControl] = useState(false);
  const [videoHeight, setVideoHeight] = useState();
  const videoPlayer = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLoad = ({duration, naturalSize}) => {
    //handle video size
    const {orientation} = naturalSize;

    if (orientation == 'landscape') {
      setVideoHeight(screenHeight / 3.85);
    } else if (orientation == 'portrait') {
      setVideoHeight(screenHeight / 1.5);
    }
    console.log('naturalSize =>', naturalSize);
    setDuration(duration);
    setIsLoading(false);
  };

  const handleProgress = ({currentTime}) => {
    setCurrentTime(currentTime);
  };

  const handleSliderChange = value => {
    videoPlayer.current.seek(value);
    setCurrentTime(value);
  };

  const handleVolumeChange = () => {
    setVolume(!volume);
  };

  const handleHideControl = () => {
    setHideControl(!hideControl);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleHideControl}>
        <Video
          source={{uri: videoUrl}}
          ref={videoPlayer}
          style={[
            styles.videoPlayer,
            {height: videoHeight ? videoHeight : 250},
          ]}
          resizeMode={'stretch'}
          onLoad={handleLoad}
          onProgress={handleProgress}
          paused={!isPlaying}
          muted={!volume}
          //onError={error => console.error(error)}
          repeat
        />
      </TouchableWithoutFeedback>
      {/* cancel button */}
      {isCancel && (
        <TouchableOpacity
          onPress={onCancelPress}
          style={styles.cancelBtn}
          activeOpacity={0.6}>
          <Icon name="cancel" size={30} color={Colors.white} />
        </TouchableOpacity>
      )}

      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={30} color={Colors.white} />
          <Text style={{color: Colors.white, fontSize: 16}}>Loading...</Text>
        </View>
      )}
      {/* control */}
      {hideControl ? (
        <>
          {!isLoading && (
            <View style={styles.controls}>
              <TouchableWithoutFeedback onPress={handlePlayPause}>
                <View style={styles.playPauseButton}>
                  {isPlaying ? (
                    <Icon
                      name="pause-circle-filled"
                      size={30}
                      color={Colors.white}
                    />
                  ) : (
                    <Icon
                      name="play-circle-fill"
                      size={30}
                      color={Colors.white}
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
                minimumTrackTintColor={Colors.white}
                maximumTrackTintColor="white"
                thumbTintColor="white"
              />
              <Text style={styles.time}>
                {Math.floor(currentTime / 60)}:
                {('0' + Math.floor(currentTime % 60)).slice(-2)} /{' '}
                {Math.floor(duration / 60)}:
                {('0' + Math.floor(duration % 60)).slice(-2)}
              </Text>
              <TouchableWithoutFeedback onPress={handleVolumeChange}>
                <View style={styles.volumeButton}>
                  {volume ? (
                    <Icon name="volume-up" size={26} color={Colors.white} />
                  ) : (
                    <Icon name="volume-off" size={26} color={Colors.white} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </>
      ) : (
        <>
          <TouchableWithoutFeedback onPress={handleVolumeChange}>
            <View style={styles.volumeButtonOutside}>
              {volume ? (
                <Icon name="volume-up" size={26} color={Colors.white} />
              ) : (
                <Icon name="volume-off" size={26} color={Colors.white} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    //borderRadius: 10,
    marginTop: 15,
  },
  videoPlayer: {
    width: width,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    //borderRadius: 10,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(19, 17, 17, 0.342)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  time: {
    color: Colors.white,
  },
  playPauseButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 15,
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
  volumeButton: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  volumeButtonOutside: {
    width: 26,
    height: 26,
    right: 10,
    position: 'absolute',
    bottom: 7,
  },
});

export default FbVideoPlayer;
