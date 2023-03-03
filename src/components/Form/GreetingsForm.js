import {View, Image, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../input/CustomInput';
import Colors from '../../constants/Colors';
import Button from '../buttons/Button';
import VideoPicker from '../VideoPicker';
import DateTimePicker from '../DateTimePicker';
import ImagePicker from 'react-native-image-crop-picker';
import RouteName from '../../constants/RouteName';
import {createGreetings} from '../../auth/auth';
import {useNavigation} from '@react-navigation/native';

const GreetingsForm = () => {
  const {control, handleSubmit} = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const handleSelectImage = async () => {
    try {
      //await requestStoragePermission();
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 250,
        cropping: true,
      });
      setSelectedImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async data => {
    console.log(data);
    //console.log(selectedImage.path);
    const {title, descriptions} = data;
    const image = selectedImage.path;
    const video = '';
    const date = '2023-03-02';
    const time = '06:23:50';
    try {
      await createGreetings(title, descriptions, image, video, date, time);
      navigation.navigate(RouteName.allGreetings);
    } catch (error) {
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
          <Button
            backgroundColor={Colors.primary}
            textColor={Colors.black}
            onPress={handleSelectImage}>
            Select Image
          </Button>
          {/* <Button title="Submit" onPress={onSubmit} /> */}
        </View>
      </View>
      {/* video picker */}
      <View>
        <VideoPicker />
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
