import {View, StyleSheet, Image, ActivityIndicator, Text} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import Colors from '../constants/Colors';
import ImageCropPicker from 'react-native-image-crop-picker';
import {UploadFileOnS3} from '../components/aws/UploadFileOnS3';
import VideoPicker from '../components/Video/VideoPicker';
import VideoPlayer from '../components/Video/VideoPlayer';
import {S3} from 'aws-sdk';
import CustomProgressBar from '../components/progress/CustomProgressBar';

const AwsVideoUploader = () => {
  const [previewVideo, setPreviewVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteKey, setDeleteKey] = useState();
  const [progress, setProgress] = useState(0);

  const pickGalleryVideo = async () => {
    try {
      setLoading(true);
      const video = await ImageCropPicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(video, 'video', setProgress);
      setPreviewVideo(response?.uploadResponse?.Location);
      setDeleteKey(response?.uploadResponse?.Key);
      setLoading(false);
    } catch (error) {
      console.log('Pick gallery Video Error => ', error);
    }
    //clear cache
    ImageCropPicker.clean()
      .then(() => {
        console.log('removed all tmp videos from tmp directory');
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
      const response = await UploadFileOnS3(video, 'video');
      //console.log(response);
      //       {
      //   "uploadResponse": {
      //     "Bucket": "shahadot-tfp-hellosuperstars",
      //     "ETag": "\"aca9754630e432b3d640c346b260898b\"",
      //     "Key": "video/1679987013435.mp4",
      //     "Location": "https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/video/1679987013435.mp4",
      //     "ServerSideEncryption": "AES256",
      //     "key": "video/1679987013435.mp4"
      //   }
      // }
      setPreviewVideo(response?.uploadResponse?.Location);
      setDeleteKey(response?.uploadResponse?.Key);
      setLoading(false);
    } catch (error) {
      console.log('Pick gallery Video Error => ', error);
    }
    //clear cache
    ImageCropPicker.clean()
      .then(() => {
        console.log('removed all tmp videos from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  //cancel button handler
  const cancelHandler = async () => {
    try {
      const bucketName = 'shahadot-tfp-hellosuperstars';
      const s3 = new S3({
        accessKeyId: 'AKIAXO5VROGDSZOY5JUX',
        secretAccessKey: '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',
        region: 'ap-southeast-1',
      });

      const deleteParams = {
        Bucket: bucketName,
        Key: deleteKey,
      };
      const deleteResponse = s3.deleteObject(deleteParams, (err, data) => {
        if (err) console.log(err, err.stack);
        else {
          console.log(data);
          setPreviewVideo(false);
        }
      });
      //console.log('delete response => ', deleteResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <>
          {/* <ActivityIndicator
            style={styles.indicator}
            color={Colors.primary}
            size={34}
          /> */}
          <View style={styles.indicator}>
            <CustomProgressBar progressBar={progress} />
          </View>
        </>
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
                    isCancel
                    onCancelPress={cancelHandler}
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
