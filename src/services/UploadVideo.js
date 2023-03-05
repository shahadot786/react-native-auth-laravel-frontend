// import RNFetchBlob from 'rn-fetch-blob';
// import {getToken} from '../auth/auth';
// import {API_BASE_URL} from '@env';

// //upload function
// export const UploadVideo = async (video) => {
//   try {
//     const token = await getToken();
//     if (!token) {
//       return null;
//     } // replace with your API token
//     const apiUrl = 'http://10.0.2.2:8000/api/upload-video'; // replace with your API endpoint

//     const fileName = video.path.split('/').pop();
//     let current = 0;
//     const uploadResponse = await RNFetchBlob.fetch(
//       'POST',
//       apiUrl,
//       {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//       [
//         {
//           name: 'video',
//           filename: fileName,
//           type: video.mime,
//           data: RNFetchBlob.wrap(video.path),
//         },
//       ],
//     ) // listen to upload progress event
//       .uploadProgress((written, total) => {
//         //   console.log('uploaded', written / total);
//         current = written;
//         setProgress(Math.round((written / total) * 100));
//         console.log(progress);
//         setTotalSize(total);
//         setCurrentSize(current);
//       });
//     // // listen to download progress event
//     // .progress((received, total) => {
//     //   console.log('progress', received / total);
//     // });

//     const responseData = JSON.parse(uploadResponse.data);
//     console.log(responseData);
//     // handle the server response
//   } catch (err) {
//     console.log(err);

//     if (RNFetchBlob.isCancelled(err)) {
//       // user cancelled the upload
//     } else if (RNFetchBlob.sessionExpired(err)) {
//       // session expired, log out user
//     } else if (err.message === 'Network request failed') {
//       // network error
//     } else if (err.message === 'Stream closed') {
//       // handle stream closed error
//       console.log('Stream closed error');

//       // display error message to user and give them the option to retry the upload
//     } else {
//       // other error
//     }
//   }
// };
