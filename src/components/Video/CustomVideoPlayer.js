import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Images from '../../constants/Images';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const CustomVideoPlayer = ({videoUrl, isCancel, onCancelPress}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(volume === 0);
  const [hideControl, setHideControl] = useState(false);
  const [videoHeight, setVideoHeight] = useState();
  const videoPlayer = useRef(null);

  //handle video size according video orientation
  const handleLoad = ({duration, naturalSize}) => {
    //handle video size
    const {orientation} = naturalSize;
    //check the orientation
    if (orientation == 'landscape') {
      setVideoHeight(screenHeight / 3.85);
    } else if (orientation == 'portrait') {
      setVideoHeight(screenHeight / 2);
    }
    setDuration(duration);
    setIsLoading(false);
  };
  //handle progress
  const handleProgress = ({currentTime}) => {
    setCurrentTime(currentTime);
  };
  //handle play pause
  const handlePlayPause = () => {
    // if (isPlaying) {
    //   setIsPlaying(!isPlaying);
    // } else {
    //   setIsPlaying(isPlaying);
    // }
    setIsPlaying(!isPlaying);
  };
  //handle video duration slider
  const handleSliderChange = value => {
    videoPlayer.current.seek(value);
    setCurrentTime(value);
  };
  //hide video controller
  const handleHideControl = () => {
    setHideControl(!hideControl);
  };
  //handle volume
  // const handleVolumeChange = value => {
  //   if (value === 0) {
  //     setIsMuted(false);
  //     //setVolume(1);
  //   } else {
  //     setIsMuted(true);
  //     //setVolume(0);
  //   }
  // };
  //handle mute
  const handleMutePress = () => {
    if (isMuted) {
      setIsMuted(false);
      //setVolume(0);
    } else {
      setIsMuted(true);
      //setVolume(1);
    }
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
          resizeMode={'contain'}
          onLoad={handleLoad}
          onProgress={handleProgress}
          paused={!isPlaying}
          muted={!isMuted}
          onError={error => console.error(error)}
          //repeat
          //volume={volume}
          poster={'https://images.shrcreation.com/Others/poster.jpg'}
          posterResizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
      {/* end video player */}
      {hideControl && (
        <>
          {!isLoading && (
            <TouchableWithoutFeedback onPress={handlePlayPause}>
              <View style={styles.playPauseButton}>
                {isPlaying ? (
                  <Ionicons
                    name="pause-circle-outline"
                    size={50}
                    color={Colors.white}
                  />
                ) : (
                  <Ionicons
                    name="play-circle-outline"
                    size={50}
                    color={Colors.white}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        </>
      )}
      {/* end play pause controller */}
      {isCancel && (
        <TouchableOpacity
          onPress={onCancelPress}
          style={styles.cancelBtn}
          activeOpacity={0.6}>
          <Icon name="cancel" size={30} color={Colors.white} />
        </TouchableOpacity>
      )}
      {/* end cancel button if isCancel active */}
      {isLoading && (
        <View style={styles.loading}>
          <FastImage
            source={Images.loadingGif}
            style={{width: 50, height: 50}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
      {/* end loader */}
      {hideControl ? (
        <>
          {!isLoading && (
            <View style={styles.controls}>
              <Text style={styles.time}>
                {Math.floor(currentTime / 60)}:
                {('0' + Math.floor(currentTime % 60)).slice(-2)} /{' '}
                {Math.floor(duration / 60)}:
                {('0' + Math.floor(duration % 60)).slice(-2)}
              </Text>
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

              <TouchableWithoutFeedback onPress={handleMutePress}>
                <View style={styles.volumeButton}>
                  {isMuted ? (
                    <Ionicons
                      name="volume-medium-sharp"
                      size={26}
                      color={Colors.white}
                    />
                  ) : (
                    <Ionicons
                      name="volume-mute"
                      size={26}
                      color={Colors.white}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
              {/* volume */}
              {/* {isMuted && (
                <Slider
                  style={styles.volumeSlider}
                  minimumValue={0}
                  maximumValue={volume}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FFFFFF"
                  value={volume}
                  onValueChange={handleVolumeChange}
                  vertical
                />
              )} */}
            </View>
          )}
        </>
      ) : (
        <>
          <TouchableWithoutFeedback onPress={handleMutePress}>
            <View style={styles.volumeButtonOutside}>
              {isMuted ? (
                <Ionicons
                  name="volume-medium-sharp"
                  size={26}
                  color={Colors.white}
                />
              ) : (
                <Ionicons name="volume-mute" size={26} color={Colors.white} />
              )}
            </View>
          </TouchableWithoutFeedback>
          {/* volume */}
          {/* {isMuted && (
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={volume}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              value={volume}
              onValueChange={handleVolumeChange}
              vertical
            />
          )} */}
        </>
      )}
      {/* end control */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  videoPlayer: {
    width: width,
    backgroundColor: '#1b1b1b49',
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
    paddingHorizontal: 5,
  },
  time: {
    color: Colors.white,
  },
  playPauseButton: {
    width: 50,
    height: 50,
    position: 'absolute',
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
    right: 5,
    position: 'absolute',
    bottom: 0,
  },
  volumeSlider: {
    height: 50,
    width: 100,
    transform: [{rotate: '-90deg'}],
    right: -30,
    position: 'absolute',
    bottom: 40,
  },
});

export default CustomVideoPlayer;
