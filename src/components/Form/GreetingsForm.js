import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../input/CustomInput';
import Colors from '../../constants/Colors';
import Button from '../buttons/Button';
import ImagePicker from 'react-native-image-crop-picker';
import RouteName from '../../constants/RouteName';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-animatable';
import RNFetchBlob from 'rn-fetch-blob';
import {getToken} from '../../auth/auth';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from '../Video/VideoPlayer';
import axios from 'axios';

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
  const handleSelectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 250,
        cropping: true,
      });
      //console.log(image);
      setSelectedImage(image);
      setValidateImage(true);
    } catch (error) {
      console.log(error);
    }
  };
  //pick videos
  const handleSelectVideo = async () => {
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: false,
      });
      //console.log(video);
      setValidateVideo(true);
      setSelectedVideo(video);
      setVideoLoading(true);
      //upload video
      try {
        await uploadVideo(video);
        setVideoLoading(false);
        setPreviewVideo(true);
      } catch (error) {
        setVideoLoading(false);
        setPreviewVideo(false);
        console.log(error.message);
      }
      //preview video
    } catch (error) {
      console.log(error);
    }
  };
  //upload video function
  const uploadVideo = async video => {
    try {
      const token = await getToken();
      if (!token) {
        return null;
      } // replace with your API token
      const apiUrl = 'http://10.0.2.2:8000/api/videos';
      const fileName = video.path.split('/').pop();
      let current = 0;

      const uploadResponse = await RNFetchBlob.fetch(
        'POST',
        apiUrl,
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        [
          {
            name: 'video',
            filename: fileName,
            type: video.mime,
            data: RNFetchBlob.wrap(video.path),
          },
        ],
      ) // listen to upload progress event
        .uploadProgress((written, total) => {
          //   console.log('uploaded', written / total);
          const progress = written / total;
          current = written;
          setProgressBar(progress);
          setProgress(Math.round((written / total) * 100));
          setTotalSize(total);
          setCurrentSize(current);
        });
      // // listen to download progress event
      // .progress((received, total) => {
      //   console.log('progress', received / total);
      // });
      // delete cached video file
      await RNFetchBlob.fs.unlink(video.path);
      //return response
      const responseData = JSON.parse(uploadResponse.data);
      setCurrentVideoData(responseData);
      // handle the server response
    } catch (err) {
      console.log(err);

      if (RNFetchBlob.isCancelled(err)) {
        // user cancelled the upload
      } else if (RNFetchBlob.sessionExpired(err)) {
        // session expired, log out user
      } else if (err.message === 'Network request failed') {
        // network error
        console.log('Network Error!');
      } else if (err.message === 'Stream closed') {
        // handle stream closed error
        console.log('Stream closed error');

        // display error message to user and give them the option to retry the upload
      } else {
        // other error
        console.log('Other Errors');
      }
    }
  };
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
    const video_url = currentVideoData.videos.video;
    const date = updatedDate;
    const time = updatedTime;

    try {
      await uploadData(title, descriptions, image, video_url, date, time);
      setLoading(false);
      navigation.replace(RouteName.allGreetings);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  //cancel button handler
  const cancelHandler = async () => {
    const videoId = currentVideoData.videos.id;
    const apiUrl = 'http://10.0.2.2:8000/api/videos';

    try {
      const token = await getToken();
      if (!token) {
        return null;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .delete(`${apiUrl}/${videoId}`, config)
        .then(response => {
          console.log('Resource deleted:', response.data);
        })
        .catch(error => {
          console.error('Error deleting resource:', error);
        });

      setPreviewVideo(false);
    } catch (error) {
      console.log(error);
    }
  };
  //submit all data
  const uploadData = async (
    title,
    descriptions,
    image,
    video_url,
    date,
    time,
  ) => {
    try {
      const token = await getToken();
      if (!token) {
        return null;
      } // replace with your API token
      const apiUrl = 'http://10.0.2.2:8000/api/greetings';
      let current = 0;

      const uploadResponse = await RNFetchBlob.fetch(
        'POST',
        apiUrl,
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        [
          {name: 'title', data: title},
          {name: 'descriptions', data: descriptions},
          {name: 'video_url', data: video_url},
          {
            name: 'image',
            filename: image.split('/').pop(),
            type: 'image/jpeg',
            data: RNFetchBlob.wrap(image),
          },
          {name: 'date', data: date},
          {name: 'time', data: time},
        ],
      ) // listen to upload progress event
        .uploadProgress((written, total) => {
          //   console.log('uploaded', written / total);
          const progress = written / total;
          current = written;
          setProgressBar(progress);
          setProgress(Math.round((written / total) * 100));
          setTotalSize(total);
          setCurrentSize(current);
        });
      // // listen to download progress event
      // .progress((received, total) => {
      //   console.log('progress', received / total);
      // });
      // delete cached video file
      //return response
      const responseData = JSON.parse(uploadResponse.data);
      console.log(responseData);
      // handle the server response
    } catch (err) {
      console.log(err);

      if (RNFetchBlob.isCancelled(err)) {
        // user cancelled the upload
      } else if (RNFetchBlob.sessionExpired(err)) {
        // session expired, log out user
      } else if (err.message === 'Network request failed') {
        // network error
        console.log('Network Error!');
      } else if (err.message === 'Stream closed') {
        // handle stream closed error
        console.log('Stream closed error');

        // display error message to user and give them the option to retry the upload
      } else {
        // other error
        console.log('Other Errors');
      }
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
          <View style={[styles.button, styles.rowView]}>
            <Text style={{color: Colors.primary}}>Select Image:</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={handleSelectImage}>
              <Icon name="image" size={25} color={Colors.white} />
            </TouchableOpacity>
            {!validateImage && (
              <Text
                style={{
                  color: Colors.danger,
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                Image is required!
              </Text>
            )}
          </View>
          {/* image preview */}
          {selectedImage && (
            <Image
              source={{uri: selectedImage.path}}
              style={{
                width: 350,
                height: 250,
                marginVertical: 15,
                borderRadius: 15,
              }}
            />
          )}
          {/* video */}
          <View style={[styles.button, styles.rowView]}>
            <Text style={{color: Colors.primary}}>Select Video:</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={handleSelectVideo}>
              <Icon name="video-camera" size={25} color={Colors.white} />
            </TouchableOpacity>
            {!validateVideo && (
              <Text
                style={{
                  color: Colors.danger,
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                Video is required!
              </Text>
            )}
          </View>
          {/* video loading */}
          {/* video preview after loading finished*/}
          {/* preview video */}
          {previewVideo && (
            <VideoPlayer
              isCancel
              onCancelPress={cancelHandler}
              videoUrl={currentVideoData.videos.video}
            />
          )}
          {videoLoading && (
            <View
              style={{gap: 15, justifyContent: 'center', alignItems: 'center'}}>
              {/* <ActivityIndicator size="large" color={Colors.primary} /> */}
              <Progress.Bar
                progress={progressBar}
                width={200}
                height={10}
                color={Colors.primary}
              />
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 20,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                {Math.round(progress)}%
              </Text>
              {/* <Text style={{color: Colors.white, fontSize: 20}}>
                Size: {(totalSize / 1000000).toFixed(2)} MB
              </Text> */}
              <Text style={{color: Colors.green, fontSize: 15}}>
                Uploaded:{(totalSize / 1000000).toFixed(2)} MB /{' '}
                {(currentSize / 1000000).toFixed(2)} MB
              </Text>
            </View>
          )}

          {/* date and time */}
          <View style={[styles.button, styles.rowView]}>
            <Text style={{color: Colors.primary}}>Select Date & Time:</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => setOpen(true)}>
              <Icon name="calendar" size={25} color={Colors.white} />
            </TouchableOpacity>
            {date && (
              <>
                <Text style={{color: Colors.white}}>{updatedDate}</Text>
                <Text style={{color: Colors.white}}>{updatedTime}</Text>
              </>
            )}
          </View>
          {/* date picker */}
          <DatePicker
            modal
            is24hourSource={false}
            open={open}
            date={date}
            theme="dark"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
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
  button: {
    paddingVertical: 10,
  },
  rowView: {
    flexDirection: 'row',
    gap: 20,
  },
});
