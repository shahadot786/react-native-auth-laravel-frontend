import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../input/CustomInput';
import Colors from '../../constants/Colors';
import Button from '../buttons/Button';
import GreetingsImagePicker from '../GreetingsImagePicker';
import VideoPicker from '../VideoPicker';
import DateTimePicker from '../DateTimePicker';
import ImageModal from '../modal/ImageModal';

const GreetingsForm = () => {
  const {control, handleSubmit} = useForm();

  const onSubmitHandler = async data => {
    //console.log(data);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* input fields */}
      <View>
        <CustomInput
          iconName={'align-left'}
          name="Title"
          placeholder="Your title goes here"
          control={control}
          rules={{
            required: 'Title is required',
            minLength: {
              value: 10,
              message: 'Title should be at least 10 characters long',
            },
            maxLength: {
              value: 50,
              message: 'Title should be max 50 characters long',
            },
          }}
        />
        <CustomInput
          name="Description"
          placeholder="Your description goes here"
          control={control}
          editable
          multiline
          numberOfLines={5}
          rules={{
            required: 'Description is required',
            minLength: {
              value: 100,
              message: 'Description should be at least 100 characters long',
            },
            maxLength: {
              value: 2048,
              message: 'Description should be max 2048 characters long',
            },
          }}
        />
      </View>
      {/* image picker */}
      <View>
        <ImageModal/>
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
