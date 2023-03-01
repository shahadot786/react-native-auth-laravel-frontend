import React, {useState, useEffect} from 'react';
import {View, Button, Image, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickerForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    requestCameraPermission();
    requestStoragePermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'This app needs storage permission in order to save your selected images.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectImage = async () => {
    try {
      await requestStoragePermission();
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setSelectedImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    if (!selectedImage) {
      console.log('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage.path,
      type: selectedImage.mime,
      name: selectedImage.path.split('/').pop(),
    });

    try {
      // Your API call here
      console.log('Image submitted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {selectedImage && (
        <Image
          source={{uri: selectedImage.path}}
          style={{width: 300, height: 400}}
        />
      )}
      <Button title="Select Image" onPress={handleSelectImage} />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

export default ImagePickerForm;
