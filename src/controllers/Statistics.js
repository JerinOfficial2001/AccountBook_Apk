import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {STATICS_API} from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_Statistic = async formDatas => {
  const cookies = await AsyncStorage.getItem('ACC-Book_userData');
  const catchData = cookies ? JSON.parse(cookies) : false;

  if (catchData) {
    try {
      const {data} = await axios.get(
        `${STATICS_API}/get?userid=${catchData._id}&type=${formDatas.queryKey[1].type}`,
        {headers: {authorization: `Bearer ${catchData.accessToken}`}},
      );
      if (data.status == 'ok') {
        return data.data;
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return null;
      }
    } catch (error) {
      ToastAndroid.show('Statistics Err', ToastAndroid.SHORT);
    }
  } else {
    ToastAndroid.show('Un-authorized', ToastAndroid.SHORT);
    return null;
  }
};
