import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Menu, Text} from 'react-native-paper';
import Supplier from '../Screens/TabScreens/Supplier';
import Customer from '../Screens/TabScreens/Customer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabNavigation({navigation}) {
  const Tab = createMaterialTopTabNavigator();
  const [open, setopen] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: '#333232', position: 'relative'}}>
      <View style={{padding: 3, flexDirection: 'row', alignItems: 'center'}}>
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
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 10,
          }}>
          <Menu
            visible={open}
            onDismiss={() => {
              setopen(false);
            }}
            contentStyle={{backgroundColor: '#262626', shadowColor: '#262626'}}
            anchor={
              <TouchableOpacity
                onPress={() => {
                  setopen(true);
                }}>
                <Icon name="more-vert" size={25} color="#6DCCDD" />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => {}} title="My Account" />
            <Menu.Item onPress={() => {}} title="Settings" />
            <Menu.Item
              onPress={() => {
                AsyncStorage.removeItem('ACC-Book_userData');
                navigation.navigate('Auth');
                setopen(false);
              }}
              title="Logout"
            />
          </Menu>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            width: 250,
            backgroundColor: '#333232',
            elevation: 0,
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
