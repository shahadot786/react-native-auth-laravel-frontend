import ImageCropPicker from 'react-native-image-crop-picker';
import api from '../api/api';
import {getToken} from '../auth/auth';

//select image from gallery
export const SelectGalleryImage = async ({
  setSelectedImage,
  setValidateImage,
}) => {
  try {
    const image = await ImageCropPicker.openPicker({
      width: 300,
      height: 250,
      cropping: true,
    });
    //console.log(image);
    setSelectedImage(image);
    setValidateImage(true);
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
//select image from camera
export const SelectCameraImage = async ({
  setSelectedImage,
  setValidateImage,
}) => {
  try {
    const image = await ImageCropPicker.openCamera({
      width: 300,
      height: 250,
      cropping: true,
    });
    setSelectedImage(image);
    setValidateImage(true);
  } catch (error) {
    console.log(error);
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
//cancel or delete video
export const CancelVideoHandler = async ({id, setPreviewVideo}) => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.delete(`/greetings/${id}`, config);
    setPreviewVideo(false);
  } catch (error) {
    console.log(error);
  }
};
