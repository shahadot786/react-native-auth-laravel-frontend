import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../input/CustomInput';
import Colors from '../../constants/Colors';
import Button from '../buttons/Button';
import ImagePicker from 'react-native-image-crop-picker';
import RouteName from '../../constants/RouteName';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from '../Video/VideoPlayer';
import {uploadData} from '../../services/GreetingsFormData';
import {
  CancelVideoHandler,
  SelectCameraImage,
  SelectGalleryImage,
} from '../../services/ResourceSelection';
import {uploadVideo} from '../../services/UploadVideo';
import ImagePickerCom from '../images/ImagePicker';
import VideoPicker from '../Video/VideoPicker';
import CustomProgressBar from '../progress/CustomProgressBar';
import CustomDateTimePicker from '../date_time/CustomDateTimePicker';

const GreetingsForm = () => {
  const {control, handleSubmit} = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  //validate image video date time
  const [validateImage, setValidateImage] = useState(true);
  const [validateVideo, setValidateVideo] = useState(true);
  //sate for video
  const [progress, setProgress] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  //get the current video data
  const [currentVideoData, setCurrentVideoData] = useState();
  //navigation
  const navigation = useNavigation();
  //convert the date time to local string
  const updatedDate = date.toLocaleDateString();
  const updatedTime = date.toLocaleTimeString();

  //pick images
  const pickGalleryImage = async () => {
    try {
      await SelectGalleryImage({setSelectedImage, setValidateImage});
    } catch (error) {
      console.log(error);
    }
  };
  //pick camera for image
  const pickCameraImage = async () => {
    try {
      await SelectCameraImage({setSelectedImage, setValidateImage});
    } catch (error) {
      console.log(error);
    }
  };
  //pick videos
  const pickGalleryVideo = async () => {
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: true,
      });
      //console.log(video);
      setValidateVideo(true);
      setSelectedVideo(video);
      navigation.navigate(RouteName.cropper, {
        videoPath: video.path,
        onTrimVideo: handleTrimVideo,
      });
      //preview video
    } catch (error) {
      console.log(error);
    }
  };
  //handleTrimVideo
  const handleTrimVideo = async trimmedVideoPath => {
    // Do something with the trimmed video path
    setVideoLoading(true);
    //console.log('Trim Path => ', trimmedVideoPath);
    //upload video
    try {
      await uploadVideo({
        trimmedVideoPath,
        setCurrentVideoData,
        setProgressBar,
        setProgress,
        setTotalSize,
        setCurrentSize,
      });
      setVideoLoading(false);
      setPreviewVideo(true);
    } catch (error) {
      setVideoLoading(false);
      setPreviewVideo(false);
      console.log(error.message);
    }
  };
  //pick camera for video
  const handleCameraVideo = async () => {
    try {
      const video = await ImagePicker.openCamera({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: true,
      });
      //console.log(video);
      setValidateVideo(true);
      setSelectedVideo(video);
      navigation.navigate(RouteName.cropper, {
        videoPath: video.path,
        onTrimVideo: handleTrimVideo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //upload video function
  const onSubmitHandler = async data => {
    //console.log(data);
    //console.log(selectedImage.path);
    //validate the image and video
    if (selectedImage == null) {
      return setValidateImage(false);
    } else if (selectedVideo == null) {
      return setValidateVideo(false);
    }
    setLoading(true);
    const {title, descriptions} = data;
    const image = selectedImage.path;
    const date = updatedDate;
    const time = updatedTime;
    //console.log(title, descriptions, image, date, time);

    try {
      const id = currentVideoData.greetings.id;
      await uploadData(title, descriptions, image, date, time, id);
      setLoading(false);
      setProgressBar(0);
      setProgress(0);
      setTotalSize(0);
      setCurrentSize(0);
      navigation.replace(RouteName.allGreetings);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  //cancel button handler
  const cancelHandler = async () => {
    try {
      const id = currentVideoData.greetings.id;
      await CancelVideoHandler({id, setPreviewVideo});
      setProgressBar(0);
      setProgress(0);
      setTotalSize(0);
      setCurrentSize(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* input fields */}
      <View>
        <CustomInput
          iconName={'align-left'}
          name="title"
          placeholder="Your title goes here"
          control={control}
          rules={{
            required: 'Title is required',
            minLength: {
              value: 1,
              message: 'Title should be at least 10 characters long',
            },
            maxLength: {
              value: 100,
              message: 'Title should be max 100 characters long',
            },
          }}
        />
        <CustomInput
          name="descriptions"
          placeholder="Your description goes here"
          control={control}
          editable
          multiline
          numberOfLines={5}
          rules={{
            required: 'Description is required',
            minLength: {
              value: 2,
              message: 'Description should be at least 50 characters long',
            },
            maxLength: {
              value: 4072,
              message: 'Description should be max 4072 characters long',
            },
          }}
        />
      </View>
      {/* image picker */}
      <View>
        <View style={{flex: 1}}>
          {/* image */}
          <ImagePickerCom
            validateImage={validateImage}
            pickCameraImage={pickCameraImage}
            pickGalleryImage={pickGalleryImage}
          />
          {/* image preview */}
          {selectedImage && (
            <>
              <Image
                source={{uri: selectedImage.path}}
                style={{
                  width: 350,
                  height: 250,
                  marginVertical: 15,
                  borderRadius: 15,
                }}
              />
              {/* <TouchableOpacity
                onPress={cancelHandler}
                style={styles.cancelBtn}
                activeOpacity={0.6}>
                <Icon name="close" size={30} color={Colors.primary} />
              </TouchableOpacity> */}
            </>
          )}
          {/* video */}
          <VideoPicker
            validateVideo={validateVideo}
            handleCameraVideo={handleCameraVideo}
            pickGalleryVideo={pickGalleryVideo}
          />
          {/* video loading */}
          {/* video preview after loading finished*/}
          {/* preview video */}
          {previewVideo && (
            <VideoPlayer
              isCancel
              onCancelPress={cancelHandler}
              videoUrl={currentVideoData.greetings.video}
            />
          )}
          {videoLoading && (
            <CustomProgressBar
              progressBar={progressBar}
              progress={progress}
              totalSize={totalSize}
              currentSize={currentSize}
            />
          )}

          {/* date and time */}
          <CustomDateTimePicker
            open={open}
            setOpen={setOpen}
            date={date}
            setDate={setDate}
            updatedDate={updatedDate}
            updatedTime={updatedTime}
          />
        </View>
      </View>

      {/* loading */}
      {loading && <ActivityIndicator size={24} color={Colors.primary} />}
      {/* Button */}
      <View
        style={[
          styles.button,
          {justifyContent: 'center', alignItems: 'center', marginVertical: 15},
        ]}>
        <Button
          backgroundColor={Colors.primary}
          textColor={Colors.black}
          onPress={handleSubmit(onSubmitHandler)}>
          SAVE
        </Button>
      </View>
    </ScrollView>
  );
};

export default GreetingsForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
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
