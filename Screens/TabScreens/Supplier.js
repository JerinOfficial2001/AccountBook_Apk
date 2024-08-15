import React, {useContext, useCallback, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_Statistic} from '../../src/controllers/Statistics';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {GET_Party} from '../../src/controllers/Party';
import {useQuery} from '@tanstack/react-query';
import {useGlobalContext} from '../../src/utils/customContext';

export default function Supplier({navigation}) {
  const {settype} = useContext(GlobalState);
  const {setstatistics} = useGlobalContext();

  const UserCard = ({onClick, data}) => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 18,
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
              {data?.partyname}
            </Text>
            <Text style={{color: '#7F7F7F'}}>{data?.date}</Text>
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
              ₹ {data?.amount ? data?.amount : 0}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const {
    data: Statistics,
    isLoading: statisticLoading,
    isFetching: statisticFetching,
  } = useQuery({
    queryKey: ['statistics', {type: 'SUPPLIER'}],
    queryFn: GET_Statistic,
  });
  const {
    data: partyDatas,
    isLoading: partyLoading,
    isFetching: partyFetching,
  } = useQuery({
    queryKey: ['parties', {id: Statistics?._id}],
    queryFn: GET_Party,
    enabled: Statistics != null,
  });

  useFocusEffect(
    useCallback(() => {
      settype('SUPPLIER');
      if (Statistics) {
        setstatistics(Statistics);
      }
    }, []),
  );
  return (
    <PageLayout
      isLoading={statisticLoading || statisticFetching}
      data={Statistics}>
      {partyLoading || partyFetching ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={data => {
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  marginTop: 18,
                }}>
                <SkeletonPlaceholder
                  backgroundColor="#333333"
                  highlightColor="#64646469">
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 80,
                      borderRadius: 10,
                    }}
                  />
                </SkeletonPlaceholder>
              </View>
            );
          }}
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{paddingBottom: 65}}
        />
      ) : partyDatas?.length > 0 ? (
        <FlatList
          data={partyDatas}
          renderItem={({item}) => {
            return (
              <UserCard
                data={item}
                onClick={() =>
                  navigation.navigate('Collections', {
                    type: 'SUPPLIER',
                    id: item._id,
                    name: item.partyname,
                  })
                }
              />
            );
          }}
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{paddingBottom: 65}}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 200, width: 200}}
            source={require('../../src/assets/empty.png')}
          />
        </View>
      )}

      <Button
        onPress={() =>
          navigation.navigate('AddParty', {
            type: 'SUPPLIER',
            id: Statistics?._id,
          })
        }
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
        <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
          ADD SUPPLIER
        </Text>
      </Button>
    </PageLayout>
  );
}
