import React, {useState} from 'react';
import {View, Button, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {getToken} from '../auth/auth';

const UPLOAD_API_ENDPOINT = 'http://10.0.2.2:8000/api/upload-video';

const VideoUploadScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);

  //select video function
  async function handleUploadVideo() {
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'MediumQuality',
        includeBase64: false,
      });

      setIsLoading(true);
      await uploadVideo(video);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
  //upload function
  async function uploadVideo(video) {
    try {
      const token = await getToken();
      if (!token) {
        return null;
      } // replace with your API token
      const apiUrl = 'http://10.0.2.2:8000/api/upload-video'; // replace with your API endpoint

      const fileName = video.path.split('/').pop();
      let current = 0;
      const uploadResponse = await RNFetchBlob.fetch(
        'POST',
        apiUrl,
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        [
          {
            name: 'video',
            filename: fileName,
            type: video.mime,
            data: RNFetchBlob.wrap(video.path),
          },
        ],
      ) // listen to upload progress event
        .uploadProgress((written, total) => {
          //   console.log('uploaded', written / total);
          current = written;
          setProgress(Math.round((written / total) * 100));
          setTotalSize(total);
          setCurrentSize(current);
        });
      // // listen to download progress event
      // .progress((received, total) => {
      //   console.log('progress', received / total);
      // });

      const responseData = JSON.parse(uploadResponse.data);
      console.log(responseData);
      // handle the server response
    } catch (err) {
      console.log(err);

      if (RNFetchBlob.isCancelled(err)) {
        // user cancelled the upload
      } else if (RNFetchBlob.sessionExpired(err)) {
        // session expired, log out user
      } else if (err.message === 'Network request failed') {
        // network error
      } else if (err.message === 'Stream closed') {
        // handle stream closed error
        console.log('Stream closed error');

        // display error message to user and give them the option to retry the upload
      } else {
        // other error
      }
    }
  }
  //format the size
  //   function formatBytes(bytes, decimals = 2) {
  //     if (bytes === 0) return '0 Bytes';
  //     const k = 1024;
  //     const dm = decimals < 0 ? 0 : decimals;
  //     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //     const i = Math.floor(Math.log(bytes) / Math.log(k));
  //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  //   }

  return (
    <View style={{gap: 25, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Select video" onPress={handleUploadVideo} />
      {isLoading && <ActivityIndicator size={30} />}
      {progress > 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text style={{color: '#000', fontSize: 20}}>
            Uploaded: {Math.round(progress)}%
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            Size: {(totalSize / 1000000).toFixed(2)} MB
          </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            Uploaded:{(totalSize / 1000000).toFixed(2)} MB /{' '}
            {(currentSize / 1000000).toFixed(2)} MB
          </Text>
        </View>
      )}
    </View>
  );
};

export default VideoUploadScreen;
