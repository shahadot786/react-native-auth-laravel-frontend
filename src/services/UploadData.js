// import RNFetchBlob from 'rn-fetch-blob';
// import {getToken} from '../auth/auth';
// import {API_BASE_URL} from '@env';

// export const UploadData = async ({
//   title,
//   descriptions,
//   image,
//   video_url,
//   date,
//   time,
//   setProgressBar,
//   setProgress,
//   setTotalSize,
//   setCurrentSize,
// }) => {
//   try {
//     const token = await getToken();
//     if (!token) {
//       return null;
//     } // replace with your API token
//     const apiUrl = `${API_BASE_URL}/greetings`;
//     const fileName = video_url.path.split('/').pop();
//     let current = 0;

//     // if(method === "POST"){

//     // }

//     const uploadResponse = await RNFetchBlob.fetch(
//       'POST',
//       apiUrl,
//       {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//       [
//         {name: 'title', data: title},
//         {name: 'descriptions', data: descriptions},
//         {
//           name: 'video',
//           filename: fileName,
//           type: video_url.mime,
//           data: RNFetchBlob.wrap(video_url.path),
//         },
//         {
//           name: 'image',
//           filename: image.split('/').pop(),
//           type: 'image/jpeg',
//           data: RNFetchBlob.wrap(image),
//         },
//         {name: 'date', data: date},
//         {name: 'time', data: time},
//       ],
//     ) // listen to upload progress event
//       .uploadProgress((written, total) => {
//         //   console.log('uploaded', written / total);
//         const progress = written / total;
//         current = written;
//         setProgressBar(progress);
//         setProgress(Math.round((written / total) * 100));
//         setTotalSize(total);
//         setCurrentSize(current);
//       });
//     // // listen to download progress event
//     // .progress((received, total) => {
//     //   console.log('progress', received / total);
//     // });
//     // delete cached video file
//     //return response
//     const responseData = JSON.parse(uploadResponse.data);
//     //console.log(responseData);
//     // handle the server response
//   } catch (err) {
//     console.log(err);

//     if (RNFetchBlob.isCancelled(err)) {
//       // user cancelled the upload
//     } else if (RNFetchBlob.sessionExpired(err)) {
//       // session expired, log out user
//     } else if (err.message === 'Network request failed') {
//       // network error
//       console.log('Network Error!');
//     } else if (err.message === 'Stream closed') {
//       // handle stream closed error
//       console.log('Stream closed error');

//       // display error message to user and give them the option to retry the upload
//     } else {
//       // other error
//       console.log('Other Errors');
//     }
//   }
// };
