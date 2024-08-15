import React, {useState, useContext} from 'react';
import ModelLayout from '../src/Layouts/ModelLayout';
import {TouchableOpacity, ToastAndroid} from 'react-native';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {GlobalState} from '../Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UPDATE_Party} from '../src/controllers/Party';
import {queryClient} from '../App';

export default function UpdateParty({route, navigation}) {
  const {title, value, data} = route.params;
  const [inputDatas, setinputDatas] = useState(value ? value : '');
  const [isLoading, setisLoading] = useState(false);
  const handleOnchange = value => {
    setinputDatas(value);
  };
  const handleSubmit = () => {
    setisLoading(true);
    AsyncStorage.getItem('ACC-Book_userData').then(cookie => {
      const catchData = cookie ? JSON.parse(cookie) : false;
      if (catchData && data?._id !== '') {
        UPDATE_Party({
          userid: catchData._id,
          token: catchData.accessToken,
          data: {
            staticsID: data?.staticsID,
            partyname: title == 'name' ? inputDatas : data?.partyname,
            phone: title == 'phone' ? inputDatas : data?.phone,
            type: data?.type,
          },
          id: data?._id,
        }).then(res => {
          if (res?.status == 'ok') {
            queryClient.invalidateQueries({queryKey: ['statistics']});
            queryClient.invalidateQueries({queryKey: ['parties']});
            setisLoading(false);
            ToastAndroid.show(res?.message, ToastAndroid.SHORT);
            navigation.navigate('Home');
          } else {
            setisLoading(false);
          }
        });
        // : ToastAndroid.show('Collection ID not found', ToastAndroid.SHORT);
      } else {
        setisLoading(false);
        ToastAndroid.show('Mandatory fields are missed', ToastAndroid.SHORT);
      }
    });
  };
  const toCapitalize = text => {
    return text.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <ModelLayout>
      <TextInput
        label={
          title == 'name' ? 'Name' : title == 'phone' ? 'Mobile Number' : ''
        }
        value={inputDatas}
        onChangeText={handleOnchange}
        mode="outlined"
        keyboardType={title == 'name' ? 'email-address' : 'phone-pad'}
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
