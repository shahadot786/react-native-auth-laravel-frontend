import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import {createContext} from 'react';

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
