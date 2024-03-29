import { Suspense, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlarmSounding } from 'src/components/AlarmSounding';
import { RootStack } from 'src/navigations/RootStack';
import { NavigaitonProvider } from 'src/providers/NavigationProvider';
import { ToastProvider } from 'src/providers/ToastProvider';

export default function App() {
  useEffect(() => {
    BootSplash.hide();
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ToastProvider>
        <NavigaitonProvider>
          <Suspense>
            <RootStack />
            <AlarmSounding />
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
