import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';

export default function AuthLayout({children}) {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
      backgroundColor: '#262626',
      height: '100%',
      position: 'relative',
    },
  });
  return <View style={styles.container}>{children}</View>;
}
