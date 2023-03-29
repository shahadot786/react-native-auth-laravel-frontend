import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import ImagePickerCom from '../components/images/ImagePicker';
import Colors from '../constants/Colors';
import ImageCropPicker from 'react-native-image-crop-picker';
import {UploadFileOnS3} from '../components/aws/UploadFileOnS3';
import CustomProgressBar from '../components/progress/CustomProgressBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DeleteFileHandler} from '../components/aws/DeleteFileHandler';

const AwsImageUploader = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteKey, setDeleteKey] = useState();
  const [progress, setProgress] = useState(0);
  const pickGalleryImage = async () => {
    try {
      setLoading(true);
      setProgress(0);
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 250,
        cropping: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(image, 'image', setProgress);
      setPreview(response?.uploadResponse?.Location);
      setDeleteKey(response?.uploadResponse?.Key);
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
      setProgress(0);
      const image = await ImageCropPicker.openCamera({
        width: 350,
        height: 280,
        cropping: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(image, 'image', setProgress);
      setPreview(response?.uploadResponse?.Location);
      setDeleteKey(response?.uploadResponse?.Key);
      setLoading(false);
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
        <>
          <View style={styles.indicator}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 24,
                textAlign: 'center',
              }}>
              {Math.round(progress * 100) + ' %'}
            </Text>
            <CustomProgressBar progressBar={progress} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            {/* Heading */}
            <Heading color={Colors.white}>Upload File into Amazon S3</Heading>
            {/* image preview */}
            <View>
              {/* image preview */}
              {preview && (
                <>
                  <Image
                    source={{uri: preview}}
                    style={{
                      width: 350,
                      height: 250,
                      marginVertical: 15,
                      borderRadius: 15,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => DeleteFileHandler(deleteKey, setPreview)}
                    style={styles.cancelBtn}
                    activeOpacity={0.6}>
                    <Icon name="cancel" size={30} color={Colors.primary} />
                  </TouchableOpacity>
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
  cancelBtn: {
    position: 'absolute',
    right: -5,
    top: 10,
    marginRight: 5,
    marginTop: 5,
    zIndex: 111111,
  },
});
