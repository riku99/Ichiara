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

  const onMapPress = async (event) => {
    console.log('✋JS event');
    console.log(event.nativeEvent);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.mapView} onMapPress={onMapPress} />
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
