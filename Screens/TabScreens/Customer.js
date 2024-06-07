import React, {useContext, useCallback} from 'react';
import {Avatar, Button, Text} from 'react-native-paper';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PageLayout from '../../src/Layouts/PageLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalState} from '../../Navigation';
import {useFocusEffect} from '@react-navigation/native';

export default function Customer({navigation}) {
  const {type, settype} = useContext(GlobalState);
  const UserCard = ({onClick}) => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={onClick}
          style={{
            backgroundColor: '#333232',
            width: '95%',
            height: 80,
            borderRadius: 15,
            padding: 15,
            flexDirection: 'row',
            gap: 10,
            position: 'relative',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: '#D9D9D9',
              padding: 8,
            }}>
            <Image
              source={require('../../src/assets/User.png')}
              resizeMode="contain"
              style={{flex: 1}}
            />
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text style={{color: '#BABABA', fontSize: 16, fontWeight: 'bold'}}>
              Name
            </Text>
            <Text style={{color: '#7F7F7F'}}>Date</Text>
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
            <Text style={{color: '#41EA66', fontWeight: 'bold', fontSize: 20}}>
              ₹25,000
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  useFocusEffect(
    useCallback(() => {
      settype('CUSTOMER');
    }, []),
  );
  return (
    <PageLayout>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
        renderItem={data => {
          return (
            <UserCard
              onClick={() =>
                navigation.navigate('Collections', {type: 'CUSTOMER'})
              }
            />
          );
        }}
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{paddingBottom: 50}}
      />
      <Button
        onPress={() => navigation.navigate('AddParty', {type: 'CUSTOMER'})}
        icon={() => <Icon name="person-add" color={'black'} size={23} />}
        mode="contained"
        textColor="black"
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          backgroundColor: '#6DCCDD',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>ADD CUSTOMER</Text>
      </Button>
    </PageLayout>
  );
}
