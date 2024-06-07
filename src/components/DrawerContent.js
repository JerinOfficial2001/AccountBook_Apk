// DrawerContent.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const DrawerContent = ({navigation}) => {
  return (
    <DrawerContentScrollView>
      <View style={{paddingVertical: 20, paddingHorizontal: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('TabOne')}>
          <Text style={{fontSize: 16, marginBottom: 10}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TabTwo')}>
          <Text style={{fontSize: 16, marginBottom: 10}}>Settings</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
