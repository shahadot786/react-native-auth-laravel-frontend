import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import {
  SelectGalleryImage,
  SelectCameraImage,
} from '../services/ResourceSelection';
import ImagePickerCom from '../components/images/ImagePicker';
import Colors from '../constants/Colors';
import {RNS3} from 'react-native-aws3';
import {FileNameToDateStringWithExtensions} from '../components/date_time/FileNameToDateStringWithExtension';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../constants/RouteName';
import ImageCropPicker from 'react-native-image-crop-picker';
import Button from '../components/buttons/Button';

const FileUploadS3 = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickGalleryImage = async () => {
    try {
      setLoading(true);
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 250,
        cropping: true,
      });
      //console.log('image =>', image);
      setSelectedImage(image);
      await uploadFile(image);
      setLoading(false);
    } catch (error) {
      console.log('Pick gallery Image Error => ', error);
    }
  };
  //pick camera for image
  const pickCameraImage = async () => {
    try {
      setLoading(true);
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 250,
        cropping: true,
      });
      //console.log('image =>', image);
      setSelectedImage(image);
      await uploadFile(image);
      setLoading(false);
    } catch (error) {
      console.log('Pick gallery Image Error => ', error);
    }
  };

  const uploadImageToS3 = async (imagePath, newFilename, type) => {
    // Set your AWS S3 configuration
    const file = {
      uri: imagePath,
      name: newFilename,
      type: type,
    };

    const options = {
      keyPrefix: 'uploads/',
      accessKey: 'AKIAXO5VROGDSZOY5JUX',
      secretKey: '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',
      region: 'ap-southeast-1',
      bucket: 'shahadot-tfp-hellosuperstars',
      successActionStatus: 201,
    };

    RNS3.put(file, options)
      .then(response => {
        if (response.status !== 201)
          throw new Error('Failed to upload image to S3');
        //console.log(response.body);
        const uploadData = response.body;
        navigation.navigate(RouteName.fileList, {awsData: uploadData});
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      })
      .progress(data => {
        let progress = (data.loaded / data.total) * 100;
        //console.log('Progress =>', progress);
      });
  };

  // Upload the selected image to S3
  const uploadFile = async image => {
    try {
      let imagePath = image.path;
      let fileName = image.path.split('/').pop();
      let type = image.mime;
      const newFilename = FileNameToDateStringWithExtensions(fileName);
      //console.log('image path => ', imagePath);
      await uploadImageToS3(imagePath, newFilename, type);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator color={Colors.primary} size={24} />
      ) : (
        <>
          <View style={styles.container}>
            {/* Heading */}
            <Heading color={Colors.white}>Upload File into Amazon S3</Heading>
            {/* image preview */}
            <View>
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
              {/* image */}
              {/* Progress Bar */}
              <ImagePickerCom
                pickCameraImage={pickCameraImage}
                pickGalleryImage={pickGalleryImage}
              />
              {/* <Button onPress={uploadFile} textColor={Colors.white}>
                Upload
              </Button> */}
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default FileUploadS3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 25,
    backgroundColor: Colors.black,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
