import React, {useState} from 'react';
import {View, Button, ActivityIndicator, Text} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import BackgroundUpload from 'react-native-background-upload';
import {S3} from 'aws-sdk';
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} from '@env';

const BackgroundFileUploader = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [videoPath, setVideoPath] = useState();

  const awsAccessKeyId = AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = AWS_SECRET_ACCESS_KEY;
  const awsRegion = AWS_REGION;
  const bucketName = AWS_BUCKET_NAME;

  const selectVideoFromGallery = async () => {
    try {
      const video = await ImageCropPicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'LowQuality',
        includeBase64: false,
      });
      setVideoPath(video);
      const options = {
        type: 'multipart',
        method: 'PUT',
        headers: {
          'content-type': video?.mime,
          'content-length': `${video?.size}`,
        },
        url: `https://${bucketName}.s3.${awsRegion}.amazonaws.com/`,
        field: 'file',
        path: video?.path.replace('file://', ''),
        bucket: bucketName,
        region: awsRegion,
        accessKey: awsAccessKeyId,
        secretKey: awsSecretAccessKey,
        successActionStatus: 201,
        key: `uploads/${video?.filename}`,
        date: new Date(),
        contentType: video?.mime,
        maxRetries: 5,
        notification: {
          enabled: true,
        },
      };

      const uploadId = await BackgroundUpload.startUpload(options)
        .then(uploadId => {
          console.log('Upload started');
          BackgroundUpload.addListener('progress', uploadId, data => {
            console.log(`Progress: ${data.progress}%`);
            setUploadProgress(data.progress);
          });
          BackgroundUpload.addListener('error', uploadId, data => {
            console.log(`Error: ${data.error}%`);
          });
          BackgroundUpload.addListener('cancelled', uploadId, data => {
            console.log(`Cancelled!`);
          });
          BackgroundUpload.addListener('completed', uploadId, data => {
            // data includes responseCode: number and responseBody: Object
            console.log('Completed!');
          });
        })
        .catch(err => {
          console.log('Upload error!', err);
        });
    } catch (error) {
      console.log('Pick gallery Video Error => ', error);
    }
  };

  return (
    <View>
      <Button
        title="Select Video"
        onPress={selectVideoFromGallery}
        disabled={isUploading}
      />
      {isUploading && (
        <View>
          <ActivityIndicator />
          <Text>Uploading... {uploadProgress}%</Text>
        </View>
      )}
    </View>
  );
};

export default BackgroundFileUploader;
