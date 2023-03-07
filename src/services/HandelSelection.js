// import ImagePicker from 'react-native-image-crop-picker';
// import {UploadData} from './UploadData';

// //handle select image
// export const HandleSelectImage = async ({
//   setSelectedImage,
//   setValidateImage,
// }) => {
//   try {
//     const image = await ImagePicker.openPicker({
//       width: 300,
//       height: 250,
//       cropping: true,
//     });
//     //console.log(image);
//     setSelectedImage(image);
//     setValidateImage(true);
//   } catch (error) {
//     console.log(error);
//   }
// };

// //handle select video
// export const HandleSelectVideo = async ({
//   setValidateVideo,
//   setSelectedVideo,
//   setVideoLoading,
//   setPreviewVideo,
//   setProgressBar,
//   setProgress,
//   setTotalSize,
//   setCurrentSize,
// }) => {
//   try {
//     const video_url = await ImagePicker.openPicker({
//       mediaType: 'video',
//       compressVideoPreset: 'LowQuality',
//       includeBase64: false,
//     });
//     //console.log(video);
//     setValidateVideo(true);
//     setSelectedVideo(video_url);
//     setVideoLoading(true);
//     //upload video
//     try {
//       await UploadData(
//         (title = ''),
//         (descriptions = ''),
//         (image = ''),
//         video_url,
//         (date = ''),
//         (time = ''),
//         setProgressBar,
//         setProgress,
//         setTotalSize,
//         setCurrentSize,
//       );
//       setVideoLoading(false);
//       setPreviewVideo(true);
//     } catch (error) {
//       setVideoLoading(false);
//       setPreviewVideo(false);
//       console.log(error.message);
//     }
//     //preview video
//   } catch (error) {
//     console.log(error);
//   }
// };
