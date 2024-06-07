import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import TabOne from '../Screens/TabScreens/Customer';
import TabTwo from '../Screens/TabScreens/Supplier';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';

export default function BottomNavigation() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor="#6DCCDD"
      inactiveColor="#FFFFFF"
      barStyle={{
        backgroundColor: '#333232',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'TabOne',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          tab: {
            borderTopWidth: 2,
            borderTopColor: '#6DCCDD',
          },
        }}
        name="TabOne"
        component={TabOne}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'TabTwo',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        name="TabTwo"
        component={TabTwo}
      />
    </Tab.Navigator>
  );
}
