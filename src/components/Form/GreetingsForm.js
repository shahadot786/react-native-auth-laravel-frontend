import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
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

const GreetingsForm = () => {
  const {control, handleSubmit} = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
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
        compressVideoPreset: 'MediumQuality',
        includeBase64: false,
      });
      //console.log(video);
      setSelectedVideo(video);
      setValidateVideo(true);
    } catch (error) {
      console.log(error);
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
    const video = selectedVideo;
    const date = updatedDate;
    const time = updatedTime;

    try {
      await uploadVideo(title, descriptions, image, video, date, time);
      setLoading(false);
      navigation.replace(RouteName.allGreetings);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  //upload video function
  const uploadVideo = async (title, descriptions, image, video, date, time) => {
    try {
      const token = await getToken();
      if (!token) {
        return null;
      } // replace with your API token
      const apiUrl = 'http://10.0.2.2:8000/api/greetings';
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
          {name: 'title', data: title},
          {name: 'descriptions', data: descriptions},
          {
            name: 'video',
            filename: fileName,
            type: video.mime,
            data: RNFetchBlob.wrap(video.path),
          },
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
      } else if (err.message === 'Stream closed') {
        // handle stream closed error
        console.log('Stream closed error');

        // display error message to user and give them the option to retry the upload
      } else {
        // other error
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          {/* loading */}
          {loading && (
            <View
              style={{justifyContent: 'center', alignItems: 'center', gap: 15}}>
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
          {/* image */}
          <View style={styles.button}>
            <Button
              backgroundColor={Colors.transparent}
              textColor={Colors.white}
              onPress={handleSelectImage}>
              Select Image
            </Button>
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
          {/* video */}
          <View style={styles.button}>
            <Button
              backgroundColor={Colors.transparent}
              textColor={Colors.white}
              onPress={handleSelectVideo}>
              Select Video
            </Button>
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
            {selectedVideo && (
              <Text
                style={{
                  color: Colors.green,
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                Video is selected
              </Text>
            )}
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => setOpen(true)}
              backgroundColor={Colors.transparent}
              textColor={Colors.white}>
              Select Date & Time
            </Button>
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
              // console.log(date.toLocaleDateString());
              // console.log(date.toLocaleTimeString());
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {/* {date ? (
            <Text>You selected: {date.toString()}</Text>
          ) : (
            <Text style={{color: 'red'}}>Please select a date</Text>
          )} */}
        </View>
      </View>

      {/* date time picker */}
      {/* Button */}
      <View style={styles.button}>
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
});
