import React, {useContext, useCallback, useState} from 'react';
import ModelLayout from '../src/Layouts/ModelLayout';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {TouchableOpacity, ToastAndroid} from 'react-native';
import {GlobalState} from '../Navigation';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADD_Party} from '../src/controllers/Party';
import {
  ADD_Collection,
  UPDATE_Collection,
} from '../src/controllers/Collections';

export default function Entries({route, navigation}) {
  const {setexpenseType, entryName} = useContext(GlobalState);
  const {data, collectionRouteData} = route.params;
  const [isLoading, setisLoading] = useState(false);
  const [inputDatas, setinputDatas] = useState({
    partyID: data?.id ? data?.id : data?.partyID ? data?.partyID : '',
    expensetype: data?.expensetype ? data?.expensetype : '',
    amount: data?.amount ? data?.amount : '',
    date: data?.date ? data?.date : '',
    details: data?.details ? data?.details : '',
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
    setisLoading(true);
    AsyncStorage.getItem('ACC-Book_userData').then(cookie => {
      const catchData = cookie ? JSON.parse(cookie) : false;
      if (
        catchData &&
        inputDatas.partyID !== '' &&
        inputDatas.expensetype !== '' &&
        inputDatas.date !== '' &&
        inputDatas.amount !== ''
      ) {
        if (entryName == 'Edit Entry') {
          data?._id
            ? UPDATE_Collection({
                userid: catchData._id,
                token: catchData.accessToken,
                data: inputDatas,
                id: data?._id,
              }).then(res => {
                if (res?.status == 'ok') {
                  setisLoading(false);
                  ToastAndroid.show(res?.message, ToastAndroid.SHORT);
                  navigation.navigate('Collections', {
                    type: collectionRouteData?.type,
                    id: collectionRouteData?.id,
                    name: collectionRouteData?.name,
                  });
                } else {
                  setisLoading(false);
                }
              })
            : ToastAndroid.show('Collection ID not found', ToastAndroid.SHORT);
        } else {
          ADD_Collection({
            userid: catchData._id,
            token: catchData.accessToken,
            data: inputDatas,
          }).then(res => {
            if (res?.status == 'ok') {
              setisLoading(false);
              ToastAndroid.show(res?.message, ToastAndroid.SHORT);
              navigation.goBack();
            } else {
              setisLoading(false);
            }
          });
        }
      } else {
        setisLoading(false);
        ToastAndroid.show('Mandatory fields are missed', ToastAndroid.SHORT);
      }
    });
  };
  return (
    <ModelLayout>
      <TextInput
        label="Amount"
        value={inputDatas.amount}
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
        keyboardType="email-address"
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
        {isLoading ? (
          <ActivityIndicator animating={true} color="white" />
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
            SAVE
          </Text>
        )}
      </TouchableOpacity>
    </ModelLayout>
  );
}
