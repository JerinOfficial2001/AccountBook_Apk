import React from 'react';
import {Button, Text} from 'react-native-paper';
import AuthLayout from '../src/Layouts/AuthLayout';

export default function Auth(props) {
  return (
    <AuthLayout>
      <Text
        style={{
          color: 'skyblue',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        J25's Boiler Plate
      </Text>
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('Home')}>
        Stack Navigation
      </Button>
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('TabNav')}>
        Tab Navigation
      </Button>
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('BottomNav')}>
        Bottom Navigation
      </Button>
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('DrawerNav')}>
        Drawar Navigation
      </Button>
    </AuthLayout>
  );
}
