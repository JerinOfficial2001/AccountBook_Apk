import React, {useContext, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import {View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import ModelLayout from '../src/Layouts/ModelLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalState} from '../Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DELETE_Party} from '../src/controllers/Party';

export default function PartyProfile({navigation, route}) {
  const {partyHeaderTitle, setpartyHeaderTitle} = useContext(GlobalState);
  const [isLoading, setisLoading] = useState(false);
  const {type, data} = route.params;
  const UserCard = ({onClick, data, icon, iconType}) => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={onClick}
          style={{
            width: '95%',
            height: 80,
            borderRadius: 15,
            padding: 15,
            flexDirection: 'row',
            gap: 13,
            alignItems: 'center',
          }}>
          {iconType == 0 && <Icon name={icon} color={'#A7A0A0'} size={27} />}
          {iconType == 1 && <Icon1 name={icon} color={'#A7A0A0'} size={27} />}
          {iconType == 2 && <Icon2 name={icon} color={'#A7A0A0'} size={27} />}
          <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
            {data?.lable && (
              <Text style={{color: '#BABABA'}}>{data?.lable}</Text>
            )}
            <Text style={{color: '#E4E4E4', fontSize: 16, fontWeight: 'bold'}}>
              {data?.value}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              top: 15,
            }}>
            <Icon name="keyboard-arrow-right" color={'#A5A5A5'} size={40} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const DeleteHandler = () => {
    setisLoading(true);
    AsyncStorage.getItem('ACC-Book_userData').then(cookie => {
      const catchData = cookie ? JSON.parse(cookie) : false;
      if (catchData && data?._id) {
        DELETE_Party({
          id: data?._id,
          userid: catchData._id,
          token: catchData.accessToken,
        }).then(res => {
          if (res?.status == 'ok') {
            setisLoading(false);
            navigation.navigate('Home');
            ToastAndroid.show(res?.message, ToastAndroid.SHORT);
          } else {
            setisLoading(false);
            ToastAndroid.show('Failed', ToastAndroid.SHORT);
          }
        });
      } else {
        setisLoading(false);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    });
  };
  return (
    <ModelLayout>
      <View
        style={{
          backgroundColor: '#333232',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 50,
        }}>
        <View
          style={{
            width: 120,
            height: 120,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            backgroundColor: '#D9D9D9',
            padding: 18,
            position: 'relative',
          }}>
          <Image
            source={require('../src/assets/User.png')}
            resizeMode="contain"
            style={{flex: 1}}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: -8,
              backgroundColor: '#8C8C8C',
              borderRadius: 100,
              padding: 8,
            }}>
            <Icon name="photo-camera" color={'white'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <UserCard
        data={{value: data?.partyname, lable: 'Name'}}
        icon="user-alt"
        iconType={1}
        onClick={() => {
          navigation.navigate('UpdateParty', {
            title: 'name',
            value: data?.partyname,
            data: data,
          }),
            setpartyHeaderTitle(
              type == 'CUSTOMER' ? 'Customer Name' : 'Supplier Name',
            );
        }}
      />
      <UserCard
        data={{value: data?.phone ? data?.phone : '-', lable: 'Mobile Number'}}
        icon="call"
        iconType={0}
        onClick={() => {
          navigation.navigate('UpdateParty', {
            title: 'phone',
            value: data.phone,
            data: data,
          }),
            setpartyHeaderTitle(
              type == 'CUSTOMER'
                ? 'Customer Mobile Number'
                : 'Supplier Mobile Number',
            );
        }}
      />
      <UserCard
        icon="vector-arrange-below"
        iconType={2}
        data={{
          value:
            type == 'CUSTOMER' ? 'Change to Supplier' : 'Change to Customer',
        }}
        // onClick={() => navigation.navigate('UpdateParty', {title: 'type'})}
      />
      <TouchableOpacity
        onPress={isLoading ? undefined : DeleteHandler}
        // icon={() => <Icon name="person-add" color={'black'} size={23} />}
        style={{
          position: 'absolute',
          bottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '95%',
          borderRadius: 8,
          borderColor: '#C03C3C',
          borderWidth: 2,
          padding: 10,
        }}>
        {!isLoading ? (
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#C03C3C'}}>
            {`DELETE ${type ? type : 'CUSTOMER'}`}
          </Text>
        ) : (
          <ActivityIndicator animating={true} color="#C03C3C" />
        )}
      </TouchableOpacity>
    </ModelLayout>
  );
}
