import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import ImagePickerCom from '../components/images/ImagePicker';
import Colors from '../constants/Colors';
import {FileNameToDateStringWithExtensions} from '../components/date_time/FileNameToDateStringWithExtension';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../constants/RouteName';
import ImageCropPicker from 'react-native-image-crop-picker';
import {S3} from 'aws-sdk';

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
      setSelectedImage(image);
      await uploadFile(image);
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

  const uploadImageOnS3 = async (imagePath, newFilename, type) => {
    // Set your AWS S3 configuration
    const url = imagePath;
    const bucketName = 'shahadot-tfp-hellosuperstars';

    const s3 = new S3({
      accessKeyId: 'AKIAXO5VROGDSZOY5JUX',
      secretAccessKey: 'BFJcyD7X8MJYcwS2w0RD5cZDDfUXMsZs+VKtC4EC',
      region: 'ap-southeast-1',
    });

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileKey = `${newFilename}`;

      const uploadManage = s3.upload(
        {
          Bucket: bucketName,
          Key: 'images/' + fileKey,
          Body: blob,
          ContentType: type,
        },
        (err, data) => {
          if (err) {
            console.log('error upload', err);
            return;
          }
          //console.log('after upload data', data);
          navigation.navigate(RouteName.fileList, {awsData: data});
        },
      );
      //navigate to other screen
      // uploadManage.on('httpUploadProgress', progress => {
      //   // console.log(
      //   //   `Uploading ${fileKey}... ${progress.loaded}/${progress.total}`,
      //   // );
      //   const progressPercentage = parseInt(
      //     (progress.loaded * 100) / progress.total,
      //   );
      //   // console.log('buffer time__', progressPercentage + '%');
      // });
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  // Upload the selected image to S3
  const uploadFile = async image => {
    try {
      let imagePath = image?.path;
      let fileName = image?.path.split('/').pop();
      let type = image?.mime;
      const newFilename = FileNameToDateStringWithExtensions(fileName);
      //console.log('image path => ', imagePath);
      await uploadImageOnS3(imagePath, newFilename, type);
    } catch (error) {
      console.log(error);
    }
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.black,
  },
});
