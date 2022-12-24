import React, { Suspense, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlarmSounding } from 'src/components/AlarmSounding';
import * as Location from 'src/nativeModules/Location';
import { RootStack } from 'src/navigations/RootStack';
import { NavigaitonProvider } from 'src/providers/NavigationProvider';
import { ToastProvider } from 'src/providers/ToastProvider';

export default function App() {
  useEffect(() => {
    const subscription = Location.authorizationChangedListener(
      async (event) => {
        switch (event.status) {
          case 'authorizedWhenInUse':
            await Location.requestAlwaysAuthorization();
            break;
          case 'authorizedAlways':
            break;
          case 'denied':
            Alert.alert(
              '位置情報の使用が許可されていません',
              'アプリを使用するには端末の設定から位置情報をオンにしてください。'
            );
            break;
        }
      }
    );

    return () => {
      subscription.remove();
    };
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
