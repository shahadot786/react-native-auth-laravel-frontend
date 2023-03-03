// import {useEffect, useState} from 'react';
// import {PermissionsAndroid, Platform} from 'react-native';
// import {request, PERMISSIONS} from 'react-native-permissions';

// const GrantCameraPermission = () => {
//   const [cameraPermission, setCameraPermission] = useState(false);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       ]).then(result => {
//         if (
//           result['android.permission.CAMERA'] === 'granted' &&
//           result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
//         ) {
//           setCameraPermission(true);
//         }
//       });
//     } else {
//       request(PERMISSIONS.IOS.CAMERA).then(result => {
//         if (result === 'granted') {
//           setCameraPermission(true);
//         }
//       });
//     }
//   }, []);
// };

// export default GrantCameraPermission;
