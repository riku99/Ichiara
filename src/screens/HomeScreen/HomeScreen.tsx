import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'src/NativeComponents/MapView';
import LocationManager from 'src/NativeModules/LocationManager';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      await LocationManager.requestWhenInUseAuthorization();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.mapView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
});
