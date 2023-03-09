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
import Button from '../../components/buttons/Button';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CropperVideoPlayer = ({videoUrl}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoPlayer = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLoad = ({duration}) => {
    setDuration(duration);
    setEndTime(duration);
    setIsLoading(false);
  };

  const handleStartTimeChange = value => {
    setStartTime(value);
  };

  const handleEndTimeChange = value => {
    setEndTime(value);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoUrl}}
        ref={videoPlayer}
        style={styles.videoPlayer}
        resizeMode="cover"
        onLoad={handleLoad}
        // onProgress={handleProgress}
        paused={!isPlaying}
      />

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
                  size={70}
                  color={Colors.primary}
                />
              ) : (
                <Icon
                  name="play-circle-fill"
                  size={70}
                  color={Colors.primary}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          {/* <Slider
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
          </Text> */}
        </View>
      )}
      <View style={styles.sliderController}>
        {/* <Text style={{color: Colors.white}}>
          Video Duration: {duration} seconds
        </Text> */}
        <View>
          <Text style={styles.time}>
            Start Time: {Math.floor(startTime / 60)}:
            {('0' + Math.floor(startTime % 60)).slice(-2)}
          </Text>
          <Slider
            style={styles.slider}
            value={startTime}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={handleStartTimeChange}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="white"
            thumbTintColor="white"
          />
        </View>
        <View>
          <Text style={styles.time}>
            End Time: {Math.floor(endTime / 60)}:
            {('0' + Math.floor(endTime % 60)).slice(-2)}
          </Text>
          <Slider
            style={styles.slider}
            value={endTime}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={handleEndTimeChange}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="white"
            thumbTintColor="white"
          />
        </View>
      </View>
      <Button backgroundColor={Colors.primary} textColor={Colors.black}>
        SAVE
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  videoPlayer: {
    width: width,
    height: height - 300,
    // aspectRatio: 9 / 16,
  },
  controls: {
    position: 'absolute',
    bottom: height / 2 - 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  time: {
    color: Colors.primary,
  },
  playPauseButton: {},
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderController: {
    gap: 12,
    marginTop: 10,
  },
  slider: {
    width: width / 1.2,
    height: 20,
  },
});
export default CropperVideoPlayer;
