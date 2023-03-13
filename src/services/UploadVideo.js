import RNFetchBlob from 'rn-fetch-blob';
import {getToken} from '../auth/auth';
import {API_BASE_URL} from '@env';

export const uploadVideo = async ({
  trimmedVideoPath,
  setCurrentVideoData,
  setProgressBar,
  setProgress,
  setTotalSize,
  setCurrentSize,
}) => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    } // replace with your API token
    const apiUrl = `${API_BASE_URL}/greetings`;
    const videoUri = `file://${trimmedVideoPath}`;
    const fileName = videoUri.split('/').pop();
    //console.log(videoUri);
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
          type: 'video/mp4',
          data: RNFetchBlob.wrap(videoUri),
        },
      ],
    ) // listen to upload progress event
      .uploadProgress((written, total) => {
        const progress = written / total;
        current = written;
        setProgressBar(progress);
        setProgress(Math.round((written / total) * 100));
        setTotalSize(total);
        setCurrentSize(current);
      });
    // // listen to download progress event
    // .progress((received, total) => {
    //   console.log('progress', received / total);
    // });
    // delete cached video file
    await RNFetchBlob.fs.unlink(videoUri);
    //return response
    const responseData = JSON.parse(uploadResponse.data);
    setCurrentVideoData(responseData);
    // handle the server response
  } catch (err) {
    console.log(err);

    if (RNFetchBlob.isCancelled(err)) {
      // user cancelled the upload
    } else if (RNFetchBlob.sessionExpired(err)) {
      // session expired, log out user
    } else if (err.message === 'Network request failed') {
      // network error
      console.log('Network Error!');
    } else if (err.message === 'Stream closed') {
      // handle stream closed error
      console.log('Stream closed error');

      // display error message to user and give them the option to retry the upload
    } else {
      // other error
      console.log('Other Errors');
    }
  }
};
