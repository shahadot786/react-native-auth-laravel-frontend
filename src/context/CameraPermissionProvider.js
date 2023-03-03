// import React, {useState, useEffect, createContext, useContext} from 'react';
// import {
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Linking,
//   AppState,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CAMERA_PERMISSION_KEY = '@CameraPermission';

// const CameraPermissionContext = createContext();

// const CameraPermissionProvider = ({children}) => {
//   const [cameraPermission, setCameraPermission] = useState(null);
//   const [appState, setAppState] = useState(AppState.currentState);

//   useEffect(() => {
//     getCameraPermission();
//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, []);

//   const handleAppStateChange = nextAppState => {
//     if (appState.match(/inactive|background/) && nextAppState === 'active') {
//       getCameraPermission();
//     }

//     setAppState(nextAppState);
//   };

//   const getCameraPermission = async () => {
//     const storedPermission = await AsyncStorage.getItem(CAMERA_PERMISSION_KEY);

//     if (storedPermission !== null) {
//       setCameraPermission(JSON.parse(storedPermission));
//     } else {
//       requestCameraPermission();
//     }
//   };

//   const setCameraPermissionAndStore = async permission => {
//     setCameraPermission(permission);
//     await AsyncStorage.setItem(
//       CAMERA_PERMISSION_KEY,
//       JSON.stringify(permission),
//     );
//   };

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message:
//               'This app needs access to your camera in order to take photos and videos.',
//             buttonPositive: 'OK',
//             buttonNegative: 'Cancel',
//           },
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           setCameraPermissionAndStore(true);
//         } else {
//           setCameraPermissionAndStore(false);
//           Alert.alert(
//             'Camera Permission',
//             'This app needs access to your camera in order to take photos and videos.',
//             [
//               {
//                 text: 'Cancel',
//                 style: 'cancel',
//               },
//               {
//                 text: 'Settings',
//                 onPress: () => Linking.openSettings(),
//               },
//             ],
//           );
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else if (Platform.OS === 'ios') {
//       const {status} = await Permissions.askAsync(Permissions.CAMERA);

//       if (status === 'granted') {
//         setCameraPermissionAndStore(true);
//       } else {
//         setCameraPermissionAndStore(false);
//         Alert.alert(
//           'Camera Permission',
//           'This app needs access to your camera in order to take photos and videos.',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
//             {
//               text: 'Settings',
//               onPress: () => Linking.openURL('app-settings:'),
//             },
//           ],
//         );
//       }
//     }
//   };

//   const contextValue = {
//     cameraPermission,
//     requestCameraPermission,
//   };

//   return (
//     <CameraPermissionContext.Provider value={contextValue}>
//       {children}
//     </CameraPermissionContext.Provider>
//   );
// };

// const useCameraPermission = () => useContext(CameraPermissionContext);

// export {CameraPermissionProvider, useCameraPermission};
