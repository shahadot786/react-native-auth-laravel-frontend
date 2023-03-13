import RNFetchBlob from 'rn-fetch-blob';
import api from '../api/api';
import {getToken} from '../auth/auth';

export const uploadData = async (
  title,
  descriptions,
  image,
  date,
  time,
  id,
) => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('descriptions', descriptions);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('image', {
      uri: image,
      name: image.split('/').pop(),
      type: 'image/jpeg',
    });
    const response = await api.post(`/greetings/${id}?_method=PUT`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    // delete cached video file
    await RNFetchBlob.fs.unlink(image);
    // handle the server response
  } catch (err) {
    console.log(err);
  }
};
