import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
export default function ModelLayout({children}) {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
      backgroundColor: '#262626',
      flex: 1,
      position: 'relative',
    },
  });
  return <View style={styles.container}>{children}</View>;
}
