import React from 'react';
import TabOne from '../Screens/TabScreens/Customer';
import TabTwo from '../Screens/TabScreens/Supplier';
import {createDrawerNavigator} from '@react-navigation/drawer';

export default function DrawarNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TabOne" component={TabOne} />
      <Drawer.Screen name="TabTwo" component={TabTwo} />
    </Drawer.Navigator>
  );
}
