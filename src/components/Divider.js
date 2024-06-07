import React from 'react';
import {View} from 'react-native';

export default function Divider({mode, width}) {
  return (
    <View
      style={{
        backgroundColor: '#5F5F5F',
        height: mode !== 'horizontal' ? '98%' : width ? width : 3,
        width: mode == 'horizontal' ? '100%' : width ? width : 3,
        borderRadius: 10,
      }}
    />
  );
}
