import {View, Image, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../input/CustomInput';
import Colors from '../../constants/Colors';
import Button from '../buttons/Button';
import DateTimePicker from '../DateTimePicker';
import ImagePicker from 'react-native-image-crop-picker';
import RouteName from '../../constants/RouteName';
import {createGreetings} from '../../auth/auth';
import {useNavigation} from '@react-navigation/native';

const GreetingsForm = () => {
  const {control, handleSubmit} = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //pick images
  const handleSelectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 250,
        cropping: true,
      });
      console.log(image);
      setSelectedImage(image);
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
      console.log(video);
      setSelectedVideo(video);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitHandler = async data => {
    //console.log(data);
    //console.log(selectedImage.path);
    setLoading(true);
    const {title, descriptions} = data;
    const image = selectedImage.path;
    const video = selectedVideo.path;
    const date = '2023-03-02';
    const time = '06:23:50';
    try {
      await createGreetings(
        title,
        descriptions,
        image,
        video,
        date,
        time,
      );
      setLoading(false);
      navigation.navigate(RouteName.allGreetings);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* input fields */}
      {loading && <ActivityIndicator size="large" color={Colors.primary} />}
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
              value: 50,
              message: 'Title should be max 50 characters long',
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
              message: 'Description should be at least 100 characters long',
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
          {/* image */}
          <Button
            backgroundColor={Colors.primary}
            textColor={Colors.black}
            onPress={handleSelectImage}>
            Select Image
          </Button>
          {/* video */}
          <View style={styles.button}>
            <Button
              backgroundColor={Colors.primary}
              textColor={Colors.black}
              onPress={handleSelectVideo}>
              Select Video
            </Button>
          </View>
        </View>
      </View>

      {/* date time picker */}
      <View>
        <DateTimePicker />
      </View>
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
    marginTop: 15,
  },
});
