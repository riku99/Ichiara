import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStack } from 'src/navigations/RootStack';
import { NavigaitonProvider } from 'src/providers/NavigationProvider';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <NavigaitonProvider>
        <Suspense>
          <RootStack />
        </Suspense>
      </NavigaitonProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
