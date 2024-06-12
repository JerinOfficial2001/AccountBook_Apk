import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';

export default function AuthLayout({children}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#262626',
      alignItems: 'center',
      gap: 10,
      position: 'relative',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  });
  return <View style={styles.container}>{children}</View>;
}
