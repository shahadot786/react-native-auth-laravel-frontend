// import React, {useState, useEffect, createContext, useContext} from 'react';
// import {
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Linking,
//   AppState,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const STORAGE_PERMISSION_KEY = '@StoragePermission';

// const StoragePermissionContext = createContext();

// const StoragePermissionProvider = ({children}) => {
//   const [storagePermission, setStoragePermission] = useState(null);
//   const [appState, setAppState] = useState(AppState.currentState);

//   useEffect(() => {
//     getStoragePermission();
//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, []);

//   const handleAppStateChange = nextAppState => {
//     if (appState.match(/inactive|background/) && nextAppState === 'active') {
//       getStoragePermission();
//     }

//     setAppState(nextAppState);
//   };

//   const getStoragePermission = async () => {
//     const storedPermission = await AsyncStorage.getItem(STORAGE_PERMISSION_KEY);

//     if (storedPermission !== null) {
//       setStoragePermission(JSON.parse(storedPermission));
//     } else {
//       requestStoragePermission();
//     }
//   };

//   const setStoragePermissionAndStore = async permission => {
//     setStoragePermission(permission);
//     await AsyncStorage.setItem(
//       STORAGE_PERMISSION_KEY,
//       JSON.stringify(permission),
//     );
//   };

//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission',
//             message:
//               'This app needs access to your storage in order to save files.',
//             buttonPositive: 'OK',
//             buttonNegative: 'Cancel',
//           },
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           setStoragePermissionAndStore(true);
//         } else {
//           setStoragePermissionAndStore(false);
//           Alert.alert(
//             'Storage Permission',
//             'This app needs access to your storage in order to save files.',
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
//       const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

//       if (status === 'granted') {
//         setStoragePermissionAndStore(true);
//       } else {
//         setStoragePermissionAndStore(false);
//         Alert.alert(
//           'Storage Permission',
//           'This app needs access to your storage in order to save files.',
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
//     storagePermission,
//     requestStoragePermission,
//   };

//   return (
//     <StoragePermissionContext.Provider value={contextValue}>
//       {children}
//     </StoragePermissionContext.Provider>
//   );
// };

// const useStoragePermission = () => useContext(StoragePermissionContext);

// export {StoragePermissionProvider, useStoragePermission};
