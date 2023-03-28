import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import ImagePickerCom from '../components/images/ImagePicker';
import Colors from '../constants/Colors';
import ImageCropPicker from 'react-native-image-crop-picker';
import {UploadFileOnS3} from '../components/aws/UploadFileOnS3';
import VideoPicker from '../components/Video/VideoPicker';
import VideoPlayer from '../components/Video/VideoPlayer';

const AwsVideoUploader = () => {
  const [previewVideo, setPreviewVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  const pickGalleryVideo = async () => {
    try {
      setLoading(true);
      const video = await ImageCropPicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(video);
      setPreviewVideo(response?.Location);
      console.log('Response => ', response);
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
  const handleCameraVideo = async () => {
    try {
      setLoading(true);
      const video = await ImageCropPicker.openCamera({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(video);
      //console.log(response);
      setPreviewVideo(response?.uploadResponse?.Location);
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
            <Heading color={Colors.white}>Upload Video into Amazon S3</Heading>
            {/* image preview */}
            <View>
              {/* image preview */}
              {previewVideo && (
                <>
                  <VideoPlayer
                    // onCancelPress={cancelHandler}
                    videoUrl={previewVideo}
                  />
                  {/* <TouchableOpacity
                onPress={cancelHandler}
                style={styles.cancelBtn}
                activeOpacity={0.6}>
                <Icon name="close" size={30} color={Colors.primary} />
              </TouchableOpacity> */}
                </>
              )}
              {/* video */}
              <VideoPicker
                handleCameraVideo={handleCameraVideo}
                pickGalleryVideo={pickGalleryVideo}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default AwsVideoUploader;
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
