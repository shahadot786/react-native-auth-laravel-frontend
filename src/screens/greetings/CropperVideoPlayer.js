import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  PermissionsAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import Button from '../../components/buttons/Button';
import {FormatTime} from '../../services/FormatTime';
import {FFmpegKit, FFmpegKitConfig} from 'ffmpeg-kit-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {CurrentDataTimeString} from '../../components/date_time/CurrentDataTimeString';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
// initialize FFmpegKit
FFmpegKitConfig.init();

const CropperVideoPlayer = ({videoUrl, onTrimVideo}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [trimLoading, setTrimLoading] = useState(false);
  const videoPlayer = useRef(null);

  //handel play pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  //handel video load
  const handleLoad = ({duration}) => {
    setDuration(duration);
    setEndTime(duration);
    setIsLoading(false);
  };
  //handel video start time
  const handleStartTimeChange = value => {
    videoPlayer.current.seek(value);
    setStartTime(value);
  };
  //handel video end time
  const handleEndTimeChange = value => {
    videoPlayer.current.seek(value);
    setEndTime(value);
  };
  //trim function
  const onTrim = async () => {
    try {
      setTrimLoading(true);
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setTrimLoading(false);
        Alert.alert(
          'Permission Denied',
          'Write permission to external storage is required to save the trimmed and compressed video.',
        );
        return;
      }
      //console.log('Video URL=> ', videoUrl);
      const input = videoUrl;
      // const input = `${newFilePath}.mp4`;
      const output = `${
        RNFetchBlob.fs.dirs.CacheDir
      }/${CurrentDataTimeString()}.mp4`;
      // Trim the video using ffmpeg-kit
      await FFmpegKit.execute(
        `-i ${input} -ss ${startTime} -to ${endTime} -filter:v scale=1280:720 ${output}`,
      );
      // Set the trimmed video path to state variable
      console.log('Output of trimmer:', output);
      setTrimLoading(false);
      onTrimVideo(output);
      //Alert.alert('Success', `Trimmed and compressed video saved to ${output}`);
      console.log('Output =>', output);
    } catch (err) {
      setTrimLoading(false);
      console.log('Error', err.message);
      //console.log(err.message);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
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
          </View>
        )}
      </View>
      <View style={styles.sliderController}>
        {/* <Text style={{color: Colors.white}}>
          Video Duration: {duration} seconds
        </Text> */}
        <View>
          <Text style={styles.time}>{FormatTime(startTime)}</Text>
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
          <Text style={styles.time}>{FormatTime(endTime)}</Text>
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
        {/* <MultiSlider
          values={values}
          min={0}
          max={duration}
          step={1}
          snapped
          allowOverlap={false}
          onValuesChange={newValues => setValues(newValues)}
          containerStyle={styles.sliderContainer}
          trackStyle={styles.sliderTrack}
          selectedStyle={styles.sliderSelected}
          markerStyle={styles.sliderMarker}
          touchDimensions={{height: 50, width: 50, borderRadius: 15}}
          customMarker={e => {
            const value = e.currentValue;
            return (
              <View style={styles.markerContainer}>
                <Text style={styles.markerText}>{value}</Text>
              </View>
            );
          }}
        /> */}
        {/* <View style={styles.labelContainer}>
          <Text style={styles.label}>{values[0]}</Text>
          <Text style={styles.label}>{values[1]}</Text>
        </View> */}
        {trimLoading && <ActivityIndicator size={30} color={Colors.primary} />}
        <Button
          onPress={onTrim}
          backgroundColor={Colors.primary}
          textColor={Colors.black}>
          SAVE
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    marginTop: 5,
    alignContent: 'center',
  },
  videoPlayer: {
    width: width,
    height: height - 300,
    // aspectRatio: 9 / 16,
  },
  controls: {
    position: 'absolute',
    bottom: '50%',
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
    textAlign: 'center',
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
    alignItems: 'center',
  },
  slider: {
    width: width / 1.2,
    height: 20,
  },
  sliderContainer: {
    height: 30,
    width: '80%',
  },
  sliderTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EAEAEA',
  },
  sliderSelected: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF9800',
  },
  sliderMarker: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    borderWidth: 2,
    borderColor: '#FF9800',
    backgroundColor: 'white',
  },
  markerContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
});
export default CropperVideoPlayer;

// const filePath = videoUrl;
// RNFS.stat(filePath)
//   .then(statResult => {
//     const fileSize = statResult.size;
//     console.log('File size:', fileSize);
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
// //const compressionCodec = 'libx264'; // Use H.264 codec for compression
// const videoBitrate = 500; // Set target video bitrate to 500 kbps
// const audioBitrate = 128; // Set target audio bitrate to 128 kbps
// const trimmedVideoExists = await RNFetchBlob.fs.exists(output);

// if (trimmedVideoExists) {
//   console.log('Trimmed video file exists!');
// } else {
//   console.log('Trimmed video file does not exist!');
// }

//'-i file1.mp4 -c:v mpeg4 file2.mp4'
//ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset veryfast -c:a copy output.mp4
// Apply compression using ffmpeg-kit
// await FFmpegKit.executeAsync(
//   `-i ${output} -c:v libx264 -b:v ${videoBitrate}k -preset veryfast -c:a aac -b:a ${audioBitrate}k ${output}`,
// );

// // Extract the directory path and file name
// const lastIndex = videoUrl.lastIndexOf('/');
// const directoryPath = videoUrl.substring(0, lastIndex + 1);
// const fileName = videoUrl.substring(lastIndex + 1);
// // Create the new file path
// const newFilePath = directoryPath + CurrentDataTimeString();
