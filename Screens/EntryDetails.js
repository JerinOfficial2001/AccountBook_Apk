import React from 'react';
import ModelLayout from '../src/Layouts/ModelLayout';
import {View, TouchableOpacity, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Divider from '../src/components/Divider';

export default function EntryDetails({navigation, route}) {
  const {data} = route.params;
  return (
    <ModelLayout>
      <View
        style={{
          backgroundColor: '#333232',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '98%',
            paddingVertical: 10,
            alignItems: 'center',
            backgroundColor: '#464545',
            borderRadius: 10,
          }}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              gap: 10,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  backgroundColor: '#D9D9D9',
                  padding: 8,
                }}>
                <Image
                  source={require('../src/assets/User.png')}
                  resizeMode="contain"
                  style={{flex: 1}}
                />
              </View>
              <View
                style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text
                  style={{color: '#BABABA', fontSize: 16, fontWeight: 'bold'}}>
                  Name
                </Text>

                <Text style={{color: '#7F7F7F'}}>Date</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Text
                style={{color: '#41EA66', fontWeight: 'bold', fontSize: 20}}>
                ₹25,000
              </Text>
              <Text
                style={{
                  color: '#BABABA',
                }}>
                You got
              </Text>
            </View>
          </View>
          <Divider mode="horizontal" />
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              gap: 10,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#BABABA', fontSize: 16, fontWeight: 'bold'}}>
              Running Balance
            </Text>
            <Text style={{color: '#41EA66', fontWeight: 'bold', fontSize: 18}}>
              ₹25,000
            </Text>
          </View>
          <Divider mode="horizontal" />
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              gap: 10,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Entries', {expenseType: data?.expenseType})
              }>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                EDIT ENTRY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          padding: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 5,
          backgroundColor: '#333232',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity
          // onPress={handleSubmit}
          // icon={() => <Icon name="person-add" color={'black'} size={23} />}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '49%',
            borderRadius: 8,
            borderWidth: 2,
            padding: 10,
            borderColor: '#C03C3C',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#C03C3C'}}>
            DELETE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('Entries', {expenseType: 'CREDIT', id: ''})
          // }
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '49%',
            borderRadius: 8,
            borderWidth: 2,
            padding: 10,
            backgroundColor: '#6DCCDD',
            borderColor: 'transparent',
          }}
          mode="contained"
          textColor="black">
          <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
            SHARE
          </Text>
        </TouchableOpacity>
      </View>
    </ModelLayout>
  );
}
