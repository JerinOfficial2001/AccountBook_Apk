import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {PARTY_API} from '../API';

export const GET_Party = async formDatas => {
  try {
    const {data} = await axios.get(
      `${PARTY_API}/get/${formDatas.statisticID}?userid=${formDatas.id}`,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data.data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('GET_Party Err', ToastAndroid.SHORT);
  }
};
export const GETINIT_Party = async formDatas => {
  try {
    const {data} = await axios.get(
      `${PARTY_API}/getInit/${formDatas.id}?userid=${formDatas.userid}`,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data.data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('GETINIT_Party Err', ToastAndroid.SHORT);
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
