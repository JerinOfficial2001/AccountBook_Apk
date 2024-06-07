import React, {useContext, useCallback, useState} from 'react';
import ModelLayout from '../src/Layouts/ModelLayout';
import {Text, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {GlobalState} from '../Navigation';
import {useFocusEffect} from '@react-navigation/native';

export default function Entries({route}) {
  const {setexpenseType, id} = useContext(GlobalState);
  const {expenseType} = route.params;
  const [inputDatas, setinputDatas] = useState({
    partyID: id ? id : '',
    expensetype: expenseType ? expenseType : '',
    amount: '',
    date: '',
    details: '',
  });
  useFocusEffect(
    useCallback(() => {
      setexpenseType(route.params.expenseType);
    }, []),
  );
  const handleOnchange = (name, value) => {
    setinputDatas(prev => ({...prev, [name]: value}));
  };
  const handleSubmit = () => {
    console.log(inputDatas);
  };
  return (
    <ModelLayout>
      <TextInput
        label="Amount"
        value={inputDatas.partyname}
        onChangeText={val => handleOnchange('amount', val)}
        mode="outlined"
        keyboardType="phone-pad"
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
        label="Enter details (items, bill no., quantity, etc.)"
        value={inputDatas.partyname}
        onChangeText={val => handleOnchange('details', val)}
        mode="outlined"
        keyboardType="phone-pad"
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
        label="Date"
        value={inputDatas.date}
        onChangeText={val => handleOnchange('date', val)}
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
          borderWidth: 2,
          padding: 10,
          backgroundColor: '#137511',
          borderColor: 'transparent',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
          SAVE
        </Text>
      </TouchableOpacity>
    </ModelLayout>
  );
}
