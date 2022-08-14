import React from 'react';
import { StyleSheet } from 'react-native';
import { RootStack } from 'src/navigations/RootStack';
import { NavigaitonProvider } from 'src/providers/NavigationProvider';

export default function App() {
  return (
    <NavigaitonProvider>
      <RootStack />
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
