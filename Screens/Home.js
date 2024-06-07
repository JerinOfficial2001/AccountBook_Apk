import React, {useCallback, useEffect} from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import {Alert, BackHandler, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

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
  return <TabNavigation navigation={navigation} />;
}
