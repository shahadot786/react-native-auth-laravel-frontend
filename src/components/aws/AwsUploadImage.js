import {useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {UploadFileOnS3} from './UploadFileOnS3';

export const AwsUploadImage = (
  loading,
  selectedImage,
  pickGalleryImage,
  pickCameraImage,
) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const pickGalleryImage = async () => {
    try {
      setLoading(true);
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 250,
        cropping: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(image);
      setSelectedImage(response?.Location);
      console.log('Response => ', response);
      setLoading(false);
    } catch (error) {
      console.log('Pick gallery Image Error => ', error);
    }
    //clear cache
    ImageCropPicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };
  //pick camera for image
  const pickCameraImage = async () => {
    try {
      setLoading(true);
      const image = await ImageCropPicker.openCamera({
        width: 350,
        height: 280,
        cropping: true,
      });
      //console.log('image =>', image);
      const response = await UploadFileOnS3(image);
      setSelectedImage(response?.Location);
      setLoading(false);
    } catch (error) {
      console.log('Pick gallery Image Error => ', error);
    }
    //clear cache
    ImageCropPicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };
};
