import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {COLLECTION_API} from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_Collection = async formDatas => {
  const cookies = await AsyncStorage.getItem('ACC-Book_userData');
  const catchData = cookies ? JSON.parse(cookies) : false;

  if (catchData) {
    try {
      const {data} = await axios.get(
        `${COLLECTION_API}/get/${formDatas.queryKey[1].id}?userid=${catchData._id}`,
        {headers: {authorization: `Bearer ${catchData.accessToken}`}},
      );
      if (data.status == 'ok') {
        return data.data;
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return [];
      }
    } catch (error) {
      ToastAndroid.show('GET_Collection Err', ToastAndroid.SHORT);
    }
  } else {
    ToastAndroid.show('Un-authorized', ToastAndroid.SHORT);
    return [];
  }
};
export const GETINIT_Collection = async formDatas => {
  try {
    const {data} = await axios.get(
      `${COLLECTION_API}/getinit/${formDatas.id}?userid=${formDatas.userid}`,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );

    if (data.status == 'ok') {
      return data.data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('GETINIT_Collection Err', ToastAndroid.SHORT);
  }
};
export const ADD_Collection = async formDatas => {
  try {
    const {data} = await axios.post(
      `${COLLECTION_API}/create?userid=${formDatas.userid}`,
      formDatas.data,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('ADD_Collection Err', ToastAndroid.SHORT);
  }
};
export const UPDATE_Collection = async formDatas => {
  try {
    const {data} = await axios.put(
      `${COLLECTION_API}/update/${formDatas.id}?userid=${formDatas.userid}`,
      formDatas.data,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('UPDATE_Collection Err', ToastAndroid.SHORT);
  }
};
export const DELETE_Collection = async formDatas => {
  try {
    const {data} = await axios.delete(
      `${COLLECTION_API}/delete/${formDatas.id}?userid=${formDatas.userid}&partyID=${formDatas.partyID}`,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('DELETE_Collection Err', ToastAndroid.SHORT);
  }
};
