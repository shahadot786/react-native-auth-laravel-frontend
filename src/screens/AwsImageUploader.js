import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import ImagePickerCom from '../components/images/ImagePicker';
import Colors from '../constants/Colors';
import ImageCropPicker from 'react-native-image-crop-picker';
import {UploadFileOnS3} from '../components/aws/UploadFileOnS3';

const AwsImageUploader = () => {
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
      const response = await UploadFileOnS3(image, 'image');
      setSelectedImage(response?.uploadResponse?.Location);
      //console.log('Response => ', response);
      setLoading(false);
    } catch (error) {
      console.log('Pick gallery Image Error => ', error);
    }
    //clear cache
    ImageCropPicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };
  //pick camera for image
  const pickCameraImage = async () => {
    try {
      setLoading(true);
      const image = await ImageCropPicker.openCamera({
        width: 350,
        height: 280,
        cropping: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(image, 'image');
      //console.log(response);
      //       {
      //   "uploadResponse": {
      //     "Bucket": "shahadot-tfp-hellosuperstars",
      //     "ETag": "\"64382f78d5ad556e83704f508cd757a3\"",
      //     "Key": "image/1679986477859.jpg",
      //     "Location": "https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/image/1679986477859.jpg",
      //     "ServerSideEncryption": "AES256",
      //     "key": "image/1679986477859.jpg"
      //   }
      // }
      setSelectedImage(response?.uploadResponse?.Location);
      setLoading(false);
    } catch (error) {
      console.log('Pick camera Image Error => ', error);
    }
    //clear cache
    ImageCropPicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={styles.indicator}
          color={Colors.primary}
          size={34}
        />
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
                    source={{uri: selectedImage}}
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
        </>
      )}
    </>
  );
};

export default AwsImageUploader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 25,
    backgroundColor: Colors.black,
    paddingVertical: 15,
    alignItems: 'center',
    paddingTop: 40,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.black,
  },
});
