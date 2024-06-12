import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {AUTH_API} from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN_Controller = async formDatas => {
  try {
    const {data} = await axios.post(AUTH_API + '/login', formDatas);
    if (data.status == 'ok') {
      const response = UserData_Controller(data.token).then(res => res);
      return response;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('Login Err', ToastAndroid.SHORT);
  }
};
export const UserData_Controller = async token => {
  try {
    const {data} = await axios.get(AUTH_API + '/userData', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.status == 'ok') {
      AsyncStorage.setItem('ACC-Book_userData', JSON.stringify(data.data));
      return data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('UserData Err', ToastAndroid.SHORT);
  }
};
