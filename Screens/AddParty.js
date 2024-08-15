import React, {useState, useCallback, useContext} from 'react';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import {TouchableOpacity, ToastAndroid} from 'react-native';
import ModelLayout from '../src/Layouts/ModelLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalState} from '../Navigation';
import {ADD_Party} from '../src/controllers/Party';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {queryClient} from '../App';

export default function AddParty({navigation, route}) {
  const {type, id} = route.params;
  const [isLoading, setisLoading] = useState(false);
  const [inputDatas, setinputDatas] = useState({
    partyname: '',
    phone: '',
    type: type ? type : '',
    staticsID: id ? id : '',
  });
  const handleOnchange = (name, value) => {
    setinputDatas(prev => ({...prev, [name]: value}));
  };
  const handleSubmit = () => {
    setisLoading(true);
    AsyncStorage.getItem('ACC-Book_userData').then(data => {
      const catchData = data ? JSON.parse(data) : false;
      if (
        catchData &&
        inputDatas.partyname !== '' &&
        inputDatas.type !== '' &&
        inputDatas.staticsID !== ''
      ) {
        ADD_Party({
          userid: catchData._id,
          token: catchData.accessToken,
          data: inputDatas,
        }).then(res => {
          if (res?.status == 'ok') {
            queryClient.invalidateQueries({queryKey: ['statistics']});
            queryClient.invalidateQueries({queryKey: ['parties']});
            setisLoading(false);
            ToastAndroid.show(res?.message, ToastAndroid.SHORT);
            navigation.goBack();
          } else {
            setisLoading(false);
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
          }
        });
      } else {
        setisLoading(false);
        ToastAndroid.show('Mandatory fields are missed', ToastAndroid.SHORT);
      }
    });
  };
  useFocusEffect(useCallback(() => {}, []));
  return (
    <ModelLayout>
      <TextInput
        label="Party Name"
        value={inputDatas.partyname}
        onChangeText={val => handleOnchange('partyname', val)}
        mode="outlined"
        style={{
          backgroundColor: 'transparent',
          width: '95%',
          marginTop: 10,
        }}
        theme={{colors: {background: '#262626'}}}
        activeOutlineColor="#6DCCDD"
        outlineColor="#7B7B7B"
        contentStyle={{color: 'white'}}
      />
      <TextInput
        label="Mobile Number"
        value={inputDatas.phone}
        onChangeText={val => handleOnchange('phone', val)}
        mode="outlined"
        style={{
          backgroundColor: 'transparent',
          width: '95%',
        }}
        theme={{colors: {background: '#262626'}}}
        activeOutlineColor="#6DCCDD"
        outlineColor="#7B7B7B"
        contentStyle={{color: 'white'}}
      />
      <TouchableOpacity
        onPress={isLoading ? undefined : handleSubmit}
        // icon={() => <Icon name="person-add" color={'black'} size={23} />}
        style={{
          position: 'absolute',
          bottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '95%',
          borderRadius: 8,
          borderColor: '#6DCCDD',
          borderWidth: 2,
          padding: 10,
        }}>
        {isLoading ? (
          <ActivityIndicator animating={true} color="#6DCCDD" />
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#6DCCDD'}}>
            {`ADD ${type ? type : 'CUSTOMER'}`}{' '}
          </Text>
        )}
      </TouchableOpacity>
    </ModelLayout>
  );
}
