import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import {createContext, useState} from 'react';

export const AuthContext = createContext();

//register method
export const register = async (
  name,
  email,
  phone,
  password,
  password_confirmation,
) => {
  try {
    const response = await api.post('/register', {
      name,
      email,
      phone,
      password,
      password_confirmation,
    });
    await AsyncStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

//login method
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });
    await AsyncStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

//logout method
export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    await api.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await AsyncStorage.removeItem('access_token');
  } catch (error) {
    console.log(error);
  }
};

//get token method
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('access_token');
  } catch (e) {
    console.error(e);
  }
};

//remove token method
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
  } catch (e) {
    console.error('Error removing token from local storage: ', e);
  }
};
//get user data method
export const getUserData = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    const response = await api.get('/user', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//get user data method
export const getUserGreetingsData = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    const response = await api.get('/greetings', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
//create greetings
//create greetings method
export const createGreetings = async (
  title,
  descriptions,
  image,
  video,
  date,
  time,
) => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    const data = new FormData();
    data.append('title', title);
    data.append('descriptions', descriptions);
    data.append('date', date);
    data.append('time', time);
    data.append('image', {
      uri: image,
      type: 'image/jpeg', // or your image mime type
      name: image.split('/').pop(),
    });
    data.append('video', {
      uri: video,
      type: 'video/mp4', // or your video mime type
      name: video.split('/').pop(), // or your video file name
    });
    const response = await api.post('/greetings', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      onUploadProgress: progressEvent => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        console.log(`Upload Progress: ${progress}%`);
        // Set the progress state here and update the UI accordingly
      },
    });
    //console.log(response);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
