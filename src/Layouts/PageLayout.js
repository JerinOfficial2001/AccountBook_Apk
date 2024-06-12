import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PageLayout({
  children,
  isCollection,
  data,
  navigation,
  type,
  isLoading,
}) {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#262626',
      height: '100%',
      position: 'relative',
    },
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#333232',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
          borderBottomColor: '#1A0B0BBF',
          borderBottomWidth: 1,
        }}>
        {isCollection && (
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              gap: 10,
              width: '100%',
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{padding: 5}}>
              <Icon name="arrow-back" size={25} color="#7F7F7F" />
            </TouchableOpacity>
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
                source={require('../assets/User.png')}
                resizeMode="contain"
                style={{flex: 1}}
              />
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text
                style={{color: '#BABABA', fontSize: 16, fontWeight: 'bold'}}>
                {data?.name}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PartyProfile', {type, data: data?.data})
                }>
                <Text style={{color: '#7F7F7F'}}>View setting</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {(!isCollection ||
          data?.expenseType == 'CREDIT' ||
          data?.expenseType == 'DEBIT') && (
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.38)', 'rgba(102, 102, 102, 0.38)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: '98%',
              height: isCollection ? 70 : 90,
              borderRadius: isCollection ? 15 : 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {(!isCollection || data?.expenseType == 'CREDIT') && (
              <View
                style={{
                  flex: 1,
                  justifyContent: isCollection ? 'space-around' : 'center',
                  alignItems: 'center',
                  width: isCollection ? '100%' : '49%',
                  flexDirection: isCollection ? 'row' : 'column',
                }}>
                <Text
                  style={{
                    color: '#BABABA',
                  }}>
                  You will give
                </Text>
                {isLoading ? (
                  <SkeletonPlaceholder
                    backgroundColor="red"
                    highlightColor="#64646469">
                    <View
                      style={{
                        width: '80%',
                        height: 30,
                        borderRadius: 10,
                      }}
                    />
                  </SkeletonPlaceholder>
                ) : (
                  <Text
                    style={{
                      color: '#41EA66',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    ₹ {data?.totalcredit || data?.amount}
                  </Text>
                )}
              </View>
            )}
            {!isCollection && (
              <View
                style={{
                  backgroundColor: '#5F5F5F',
                  height: '80%',
                  width: 3,
                  borderRadius: 10,
                }}
              />
            )}
            {(!isCollection || data?.expenseType == 'DEBIT') && (
              <View
                style={{
                  flex: 1,
                  justifyContent: isCollection ? 'space-around' : 'center',
                  alignItems: 'center',
                  width: isCollection ? '100%' : '49%',
                  flexDirection: isCollection ? 'row' : 'column',
                }}>
                <Text style={{color: '#BABABA'}}>You will gave</Text>
                <Text
                  style={{color: '#EA5F41', fontWeight: 'bold', fontSize: 20}}>
                  ₹ {data?.totaldebit || data?.amount}
                </Text>
              </View>
            )}
          </LinearGradient>
        )}
      </View>
      {children}
    </View>
  );
}
