import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigaitonProvider } from 'src/providers/NavigationProvider';

export default function App() {
  return (
    <NavigaitonProvider>
      <View style={styles.container}>
        <Text>Hello Ichiara</Text>
        <StatusBar style="auto" />
      </View>
    </NavigaitonProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
