import {FFmpegKit, FFmpegKitConfig} from 'ffmpeg-kit-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {CurrentDataTimeString} from '../date_time/CurrentDataTimeString';
import {PermissionsAndroid, Alert} from 'react-native';

// initialize FFmpegKit
FFmpegKitConfig.init();

export const HlsConverter = async fileUri => {
  // get the video uri
  const input = fileUri?.path;
  // set the output
  const output = `${
    RNFetchBlob.fs.dirs.CacheDir
  }/${CurrentDataTimeString()}.m3u8`;
  console.log('input:', input);

  const command = `-i ${input} -codec: copy -bsf:v h264_mp4toannexb -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${output}`;

  try {
    // request write permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        'Permission Denied',
        'Write permission to external storage is required to save the trimmed and compressed video.',
      );
      return;
    }

    // convert the video using ffmpeg-kit
    await FFmpegKit.execute(command);
    console.log('Output => ', output);
    return output;
  } catch (error) {
    console.log('hls error', error);
    Alert.alert('Error', 'An error occurred during the conversion process.');
  }
};
