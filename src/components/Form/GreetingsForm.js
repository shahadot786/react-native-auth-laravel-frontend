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
import {createGreetings} from '../../auth/auth';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-animatable';

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
    const video = selectedVideo.path;
    const date = updatedDate;
    const time = updatedTime;
    try {
      await createGreetings(title, descriptions, image, video, date, time);
      setLoading(false);
      navigation.replace(RouteName.allGreetings);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
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
          {loading && <ActivityIndicator size="large" color={Colors.primary} />}
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
