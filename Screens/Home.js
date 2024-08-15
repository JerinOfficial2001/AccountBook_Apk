import React, {useCallback, useEffect} from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import {Alert, BackHandler, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useGlobalContext} from '../src/utils/customContext';
import {Text} from 'react-native-paper';

export default function Home({navigation}) {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  const {statistics} = useGlobalContext();

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          height: 220,
        }}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.38)', 'rgba(102, 102, 102, 0.38)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '98%',
            height: 90,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                color: '#BABABA',
              }}>
              You will give
            </Text>

            <Text
              style={{
                color: '#41EA66',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              ₹ {statistics?.totalcredit || statistics?.amount}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}>
            <Text style={{color: '#BABABA'}}>You will gave</Text>
            <Text style={{color: '#EA5F41', fontWeight: 'bold', fontSize: 20}}>
              ₹ {statistics?.totaldebit || statistics?.amount}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <TabNavigation navigation={navigation} />
    </View>
  );
}
