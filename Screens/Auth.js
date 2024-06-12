import React, {useState, useCallback} from 'react';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import {ToastAndroid} from 'react-native';
import {View, Image} from 'react-native';
import AuthLayout from '../src/Layouts/AuthLayout';
import {LOGIN_Controller} from '../src/controllers/Auth';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth({navigation}) {
  const [isLoading, setisLoading] = useState(false);
  const [inputDatas, setinputDatas] = useState({
    phone: '',
    password: '',
  });
  const handleOnchange = (name, value) => {
    setinputDatas(prev => ({...prev, [name]: value}));
  };
  const handleSubmit = () => {
    if (inputDatas.password !== '' && inputDatas.phone !== '') {
      setisLoading(true);
      LOGIN_Controller(inputDatas).then(data => {
        if (data) {
          setisLoading(false);
          if (data?.status == 'ok') {
            navigation.navigate('Home');
          } else {
            console.log('err', data?.message);
          }
        } else {
          setisLoading(false);
        }
      });
    } else {
      ToastAndroid.show('All fields are mandatory', ToastAndroid.SHORT);
    }
  };
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('ACC-Book_userData').then(data => {
        if (data) {
          navigation.navigate('Home');
        }
      });
    }, []),
  );
  return (
    <AuthLayout>
      <View style={{padding: 10, flexDirection: 'row'}}>
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../src/assets/MyLogo.png')}
            resizeMode="contain"
            style={{flex: 1}}
          />
        </View>
        <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text style={{color: '#6DCCDD', fontSize: 20, fontWeight: 'bold'}}>
            ACCOUNT BOOK
          </Text>
        </View>
      </View>
      <TextInput
        label="Mobile Number"
        value={inputDatas.phone}
        onChangeText={val => handleOnchange('phone', val)}
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
        contentStyle={{
          color: 'white',
        }}
      />
      <TextInput
        label="Password"
        value={inputDatas.password}
        onChangeText={val => handleOnchange('password', val)}
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
        contentStyle={{
          color: 'white',
        }}
      />
      <Button
        onPress={isLoading ? undefined : handleSubmit}
        mode="contained"
        textColor="black"
        style={{backgroundColor: '#6DCCDD'}}>
        {isLoading ? (
          <ActivityIndicator animating={true} color="black" />
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
            LOGIN
          </Text>
        )}
      </Button>
    </AuthLayout>
  );
}
