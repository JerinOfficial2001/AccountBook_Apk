import React, {useCallback, useState, useContext} from 'react';
import {Button, Text} from 'react-native-paper';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PageLayout from '../src/Layouts/PageLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {GET_Collection} from '../src/controllers/Collections';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {GETINIT_Party} from '../src/controllers/Party';
import {GlobalState} from '../Navigation';

export default function Collections({navigation, route}) {
  const {type, id, name} = route.params;
  const {setEntryName} = useContext(GlobalState);

  const [userData, setuserData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isPartyDataLoading, setisPartyDataLoading] = useState(true);
  const [partyData, setpartyData] = useState(null);
  const [CollectionDatas, setCollectionDatas] = useState([]);
  useFocusEffect(
    useCallback(() => {
      setisLoading(true);
      setisPartyDataLoading(true);
      AsyncStorage.getItem('ACC-Book_userData').then(data => {
        const catchData = data ? JSON.parse(data) : false;
        if (catchData) {
          setuserData(catchData);
          GET_Collection({
            userid: catchData._id,
            token: catchData.accessToken,
            partyId: id,
          }).then(data => {
            if (data) {
              setisLoading(false);
              setCollectionDatas(data);
            }
          });
          GETINIT_Party({
            userid: catchData._id,
            token: catchData.accessToken,
            id: id,
          }).then(data => {
            if (data) {
              setisPartyDataLoading(false);
              setpartyData(data);
            }
          });
        } else {
          navigation.navigate('/Auth');
        }
      });
    }, []),
  );
  const UserCard = ({onClick, data}) => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 19,
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
              {data?.date}
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
                {data?.expensetype == 'DEBIT'
                  ? `₹ ${data?.amount}`
                  : '    -    '}
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
                {data?.expensetype == 'CREDIT'
                  ? `₹ ${data?.amount}`
                  : '    -    '}
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
      data={{
        expenseType: partyData?.expensetype,
        name: name,
        amount: partyData?.amount,
        data: partyData,
      }}>
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={data => {
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  marginTop: 15,
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
          contentContainerStyle={{paddingBottom: 15}}
        />
      ) : CollectionDatas.length > 0 ? (
        <ScrollView
          contentContainerStyle={{paddingBottom: 15}}
          style={{flex: 1, width: '100%'}}>
          {CollectionDatas.map(item => (
            <UserCard
              data={item}
              key={item._id}
              onClick={() =>
                navigation.navigate('EntryDetails', {
                  data: {...item, name},
                  collectionRouteData: {
                    type,
                    id,
                    name,
                  },
                })
              }
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 200, width: 200}}
            source={require('../src/assets/outofstock.png')}
          />
        </View>
      )}
      <View
        style={{
          width: '100%',
          padding: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 5,
          backgroundColor: '#333232',
          borderTopColor: '#1A0B0BBF',
          borderTopWidth: 1,
        }}>
        <Button
          onPress={() => {
            navigation.navigate('Entries', {
              data: {id: partyData?._id, expensetype: 'DEBIT'},
            }),
              setEntryName('Add Entry');
          }}
          style={{width: '49%', borderRadius: 10, backgroundColor: '#C03C3C'}}
          mode="contained">
          <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
            YOU GAVE
          </Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('Entries', {
              data: {id: partyData?._id, expensetype: 'CREDIT'},
            }),
              setEntryName('Add Entry');
          }}
          style={{width: '49%', borderRadius: 10, backgroundColor: '#137511'}}
          mode="contained">
          <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
            YOU GOT
          </Text>
        </Button>
      </View>
    </PageLayout>
  );
}
