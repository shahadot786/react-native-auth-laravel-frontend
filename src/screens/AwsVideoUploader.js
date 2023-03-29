import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import Colors from '../constants/Colors';
import ImageCropPicker from 'react-native-image-crop-picker';
import {UploadFileOnS3} from '../components/aws/UploadFileOnS3';
import VideoPicker from '../components/Video/VideoPicker';
import VideoPlayer from '../components/Video/VideoPlayer';
import CustomProgressBar from '../components/progress/CustomProgressBar';
import {DeleteFileHandler} from '../components/aws/DeleteFileHandler';
import {HlsConverter} from '../components/aws/HlsConverter';
import {HlsVideoUploader} from '../components/aws/HlsVideoUploader';

const AwsVideoUploader = () => {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteKey, setDeleteKey] = useState();
  const [progress, setProgress] = useState(0);

  const pickGalleryVideo = async () => {
    try {
      setLoading(true);
      setProgress(0);
      const video = await ImageCropPicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: true,
      });
      //console.log('image =>', image);
      const hlsResponse = await HlsConverter(video);
      //console.log('Hls Response =>', hlsResponse);
      const videoUri = `file://${hlsResponse}`;
      setPreview(videoUri);
      // const response = await HlsVideoUploader(videoUri, 'video', setProgress);
      // setPreview(response?.uploadResponse?.Location);
      // setDeleteKey(response?.uploadResponse?.Key);
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
      setProgress(0);
      const video = await ImageCropPicker.openCamera({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: true,
      });
      //console.log('image =>', image);
      const hlsResponse = await HlsConverter(video);
      console.log('Hls Response =>', hlsResponse);
      const videoUri = `file://${hlsResponse}`;
      setPreview(videoUri);
      const response = await HlsVideoUploader(videoUri, 'video', setProgress);
      // setPreview(response?.uploadResponse?.Location);
      // setDeleteKey(response?.uploadResponse?.Key);
      setLoading(false);
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
  console.log('file data =>', preview);
  //set progress value
  // const uploadedBytes = progress?.loaded;
  // const totalBytes = progress?.total;
  // const progressValue = uploadedBytes / totalBytes;

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
            <Heading color={Colors.white}>Upload Video into Amazon S3</Heading>
            {/* image preview */}
            <View>
              {/* image preview */}
              {preview && (
                <>
                  <VideoPlayer
                    isCancel
                    onCancelPress={() =>
                      DeleteFileHandler(deleteKey, setPreview)
                    }
                    videoUrl={preview}
                  />
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
