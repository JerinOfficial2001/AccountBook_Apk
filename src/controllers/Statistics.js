import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {STATICS_API} from '../API';

export const GET_Statistic = async formDatas => {
  try {
    const {data} = await axios.get(
      `${STATICS_API}/get?userid=${formDatas.id}&type=${formDatas.type}`,
      {headers: {authorization: `Bearer ${formDatas.token}`}},
    );
    if (data.status == 'ok') {
      return data.data;
    } else {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('Statistics Err', ToastAndroid.SHORT);
  }
};
