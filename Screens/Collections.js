import React from 'react';
import {Button, Text} from 'react-native-paper';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import PageLayout from '../src/Layouts/PageLayout';

export default function Collections({navigation, route}) {
  const {type} = route.params;

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
            paddingHorizontal: 15,
            flexDirection: 'row',
            gap: 10,
            position: 'relative',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text style={{color: '#BABABA', fontSize: 20, fontWeight: 'bold'}}>
              Date
            </Text>
            <Text style={{color: '#7F7F7F', fontSize: 13, fontWeight: 'bold'}}>
              Time
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: '#E89C9C24',
                paddingHorizontal: 20,
              }}>
              <Text
                style={{color: '#EA5F41', fontWeight: 'bold', fontSize: 17}}>
                ₹25,000
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Text
                style={{color: '#41EA66', fontWeight: 'bold', fontSize: 16}}>
                ₹25,000
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <PageLayout
      type={type}
      navigation={navigation}
      isCollection={true}
      data={{credit: true}}>
      <ScrollView style={{flex: 1, width: '100%'}}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(party => (
          <UserCard
            key={party}
            onClick={() =>
              navigation.navigate('EntryDetails', {
                data: {expenseType: 'DEBIT'},
              })
            }
          />
        ))}
      </ScrollView>
      <View
        style={{
          width: '100%',

          padding: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 5,
          backgroundColor: '#333232',
        }}>
        <Button
          onPress={() =>
            navigation.navigate('Entries', {expenseType: 'DEBIT', id: ''})
          }
          style={{width: '49%', borderRadius: 10, backgroundColor: '#C03C3C'}}
          mode="contained">
          YOU GAVE
        </Button>
        <Button
          onPress={() =>
            navigation.navigate('Entries', {expenseType: 'CREDIT', id: ''})
          }
          style={{width: '49%', borderRadius: 10, backgroundColor: '#137511'}}
          mode="contained">
          YOU GOT
        </Button>
      </View>
    </PageLayout>
  );
}
