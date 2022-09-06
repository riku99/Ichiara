import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStack } from 'src/navigations/RootStack';
import { NavigaitonProvider } from 'src/providers/NavigationProvider';
import { ToastProvider } from 'src/providers/ToastProvider';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ToastProvider>
        <NavigaitonProvider>
          <Suspense>
            <RootStack />
          </Suspense>
        </NavigaitonProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
