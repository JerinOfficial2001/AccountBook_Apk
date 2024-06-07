import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from '../Screens/Auth';
import TabNav from '../Screens/Home';
import BottomNav from '../Screens/BottomNav';
import DrawerNav from '../Screens/DrawerNav';
import {TransitionPresets} from '@react-navigation/stack';
import AddParty from '../Screens/AddParty';
import Collections from '../Screens/Collections';
import Entries from '../Screens/Entries';
import Home from '../Screens/Home';
import EntryDetails from '../Screens/EntryDetails';
import CustomerProfile from '../Screens/CustomerProfile';
import UpdateParty from '../Screens/UpdateParty';

export const GlobalState = createContext();

export default function Navigator() {
  const Stack = createStackNavigator();
  const [expenseType, setexpenseType] = useState('');
  const [type, settype] = useState('CUSTOMER');
  const [partyHeaderTitle, setpartyHeaderTitle] = useState('');
  return (
    <GlobalState.Provider
      value={{
        expenseType,
        setexpenseType,
        type,
        settype,
        partyHeaderTitle,
        setpartyHeaderTitle,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {duration: 200},
              },
              close: {
                animation: 'timing',
                config: {duration: 200},
              },
            },
            headerStyle: {
              backgroundColor: '#333232',
            },
            headerTitleStyle: {
              color: '#7F7F7F',
            },
            headerTintColor: '#7F7F7F',
          }}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            component={Home}
            name="Home"
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            component={Auth}
            name="Auth"
          />
          <Stack.Screen
            component={BottomNav}
            name="BottomNav"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            component={AddParty}
            name="AddParty"
            options={{
              // headerShown: false,
              title: 'Add Party',
            }}
          />
          <Stack.Screen
            component={Collections}
            name="Collections"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            component={Entries}
            name="Entries"
            options={{
              // headerShown: false,
              title: 'Add Entry',
              headerTitleStyle: {
                color: expenseType == 'DEBIT' ? '#C03C3C' : '#137511',
              },
              headerTintColor: expenseType == 'DEBIT' ? '#C03C3C' : '#137511',
            }}
          />
          <Stack.Screen
            component={EntryDetails}
            name="EntryDetails"
            options={{
              // headerShown: false,
              title: 'Entry Details',
            }}
          />
          <Stack.Screen
            component={CustomerProfile}
            name="CustomerProfile"
            options={{
              // headerShown: false,
              title:
                type == 'CUSTOMER' ? 'Customer Profile' : 'Supplier Profile',
            }}
          />
          <Stack.Screen
            component={UpdateParty}
            name="UpdateParty"
            options={{
              // headerShown: false,
              title: partyHeaderTitle,
            }}
          />
          <Stack.Screen component={DrawerNav} name="DrawerNav" />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState.Provider>
  );
}
