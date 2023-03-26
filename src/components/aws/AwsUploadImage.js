import {RNS3} from 'react-native-aws3';
import {FileNameToDateStringWithExtensions} from '../components/date_time/FileNameToDateStringWithExtension';
import Upload from './Upload';

const AwsUploadImage = async selectedImage => {
  try {
    let imagePath = selectedImage.path;
    let fileName = selectedImage.path.split('/').pop();
    let type = selectedImage.mime;
    const newFilename = FileNameToDateStringWithExtensions(fileName);
    await Upload(imagePath, newFilename, type);
  } catch (error) {
    console.log(error);
  }
};

export default AwsUploadImage;
