import React, {useState, useCallback, useContext} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import ModelLayout from '../src/Layouts/ModelLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalState} from '../Navigation';

export default function AddParty({id, navigation, route}) {
  const {type} = route.params;
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
    console.log(inputDatas);
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
        onPress={handleSubmit}
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
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#6DCCDD'}}>
          {`ADD ${type ? type : 'CUSTOMER'}`}{' '}
        </Text>
      </TouchableOpacity>
    </ModelLayout>
  );
}
