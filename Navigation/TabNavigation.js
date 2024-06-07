import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import Supplier from '../Screens/TabScreens/Supplier';
import Customer from '../Screens/TabScreens/Customer';

export default function TabNavigation({navigation}) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{flex: 1, backgroundColor: '#333232', position: 'relative'}}>
      <View style={{padding: 10, flexDirection: 'row'}}>
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../src/assets/MyLogo.png')}
            resizeMode="contain"
            style={{flex: 1}}
          />
        </View>
        <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text style={{color: '#6DCCDD', fontSize: 20, fontWeight: 'bold'}}>
            ACCOUNT BOOK
          </Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            width: 250,
            backgroundColor: '#333232',
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: 'white',
          tabBarIndicatorStyle: {
            width: 70,
            height: 5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: 'center',
            marginLeft: 28,
            backgroundColor: '#6DCCDD',
          },
        }}>
        <Tab.Screen
          name="CUSTOMERS"
          component={Customer}
          navigation={navigation}
        />
        <Tab.Screen
          name="SUPPLIERS"
          component={Supplier}
          navigation={navigation}
        />
      </Tab.Navigator>
    </View>
  );
}
