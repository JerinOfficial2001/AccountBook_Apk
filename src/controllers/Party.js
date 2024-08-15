import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {PARTY_API} from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_Party = async formDatas => {
  const cookies = await AsyncStorage.getItem('ACC-Book_userData');
  const catchData = cookies ? JSON.parse(cookies) : false;

  if (catchData) {
    try {
      const {data} = await axios.get(
        `${PARTY_API}/get/${formDatas.queryKey[1].id}?userid=${catchData._id}`,
        {headers: {authorization: `Bearer ${catchData.accessToken}`}},
      );
      if (data.status == 'ok') {
        return data.data;
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return [];
      }
    } catch (error) {
      ToastAndroid.show('GET_Party Err', ToastAndroid.SHORT);
    }
  } else {
    ToastAndroid.show('Un-authorized', ToastAndroid.SHORT);
    return [];
  }
};
export const GETINIT_Party = async formDatas => {
  const cookies = await AsyncStorage.getItem('ACC-Book_userData');
  const catchData = cookies ? JSON.parse(cookies) : false;

  if (catchData) {
    try {
      const {data} = await axios.get(
        `${PARTY_API}/getInit/${formDatas.queryKey[1].id}?userid=${catchData._id}`,
        {headers: {authorization: `Bearer ${catchData.accessToken}`}},
      );
      if (data.status == 'ok') {
        return data.data;
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return null;
      }
    } catch (error) {
      ToastAndroid.show('GETINIT_Party Err', ToastAndroid.SHORT);
    }
  } else {
    ToastAndroid.show('Un-authorized', ToastAndroid.SHORT);
    return null;
  }
};
export const ADD_Party = async formDatas => {
  try {
    const {data} = await axios.post(
      `${PARTY_API}/create?userid=${formDatas.userid}`,
      formDatas.data,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('ADD_Party Err', ToastAndroid.SHORT);
  }
};
export const DELETE_Party = async formDatas => {
  try {
    const {data} = await axios.delete(
      `${PARTY_API}/delete/${formDatas.id}?userid=${formDatas.userid}`,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('DELETE_Party Err', ToastAndroid.SHORT);
  }
};
export const UPDATE_Party = async formDatas => {
  try {
    const {data} = await axios.put(
      `${PARTY_API}/update/${formDatas.id}?userid=${formDatas.userid}`,
      formDatas.data,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('UPDATE_Party Err', ToastAndroid.SHORT);
  }
};
