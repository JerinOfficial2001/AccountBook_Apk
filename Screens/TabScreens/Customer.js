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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_Statistic} from '../../src/controllers/Statistics';
import {GET_Party} from '../../src/controllers/Party';

export default function Customer({navigation}) {
  const {type, settype} = useContext(GlobalState);
  const [isLoading, setisLoading] = useState(true);
  const [isPartyLoading, setisPartyLoading] = useState(true);
  const [partyDatas, setpartyDatas] = useState([]);
  const [userData, setuserData] = useState(null);
  const [Statistics, setStatistics] = useState(null);
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
  const fetchData = () => {
    AsyncStorage.getItem('ACC-Book_userData').then(data => {
      const catchData = data ? JSON.parse(data) : false;
      if (catchData) {
        setuserData(catchData);
        GET_Statistic({
          id: catchData._id,
          token: catchData.accessToken,
          type: 'CUSTOMER',
        }).then(data => {
          if (data) {
            setisLoading(false);
            setStatistics(data);
            GET_Party({
              id: catchData._id,
              token: catchData.accessToken,
              statisticID: data._id,
            }).then(party => {
              if (party) {
                setisPartyLoading(false);
                setpartyDatas(party);
              }
            });
          }
        });
      } else {
        navigation.navigate('/Auth');
      }
    });
  };
  useFocusEffect(
    useCallback(() => {
      setisLoading(true);
      setisPartyLoading(true);
      settype('CUSTOMER');
      fetchData();
    }, []),
  );

  return (
    <PageLayout data={Statistics}>
      {isPartyLoading ? (
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
      ) : partyDatas.length > 0 ? (
        <FlatList
          data={partyDatas}
          renderItem={({item}) => {
            return (
              <UserCard
                data={item}
                onClick={() =>
                  navigation.navigate('Collections', {
                    type: 'CUSTOMER',
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
            type: 'CUSTOMER',
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
          ADD CUSTOMER
        </Text>
      </Button>
    </PageLayout>
  );
}
