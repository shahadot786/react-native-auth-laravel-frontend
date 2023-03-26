import {View, StyleSheet, Image} from 'react-native';
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

const FileUploadS3 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
        console.log(response.body);
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

  const pickGalleryImage = async () => {
    try {
      await SelectGalleryImage({setSelectedImage});
      // uploaded image URL
      console.log(selectedImage);
      //await uploadFile();
    } catch (error) {
      console.log(error);
    }
  };

  //pick camera for image
  const pickCameraImage = async () => {
    try {
      await SelectCameraImage({setSelectedImage});
      console.log(selectedImage);
      await uploadFile();
    } catch (error) {
      console.log(error);
    }
  };
  // Upload the selected image to S3
  const uploadFile = async () => {
    try {
      let imagePath = selectedImage.path;
      let fileName = selectedImage.path.split('/').pop();
      let type = selectedImage.mime;
      const newFilename = FileNameToDateStringWithExtensions(fileName);
      await uploadImageToS3(imagePath, newFilename, type);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      </View>
    </View>
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
