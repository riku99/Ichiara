import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapPressEvent, MapView } from 'src/NativeComponents/MapView';
import * as Location from 'src/NativeModules/Location';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const subscription = Location.authorizationChangedListener((event) => {
      console.log('🌙 event is ');
      console.log(event);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const result = await Location.locationServicesEnabled();
      console.log('✋ result is ' + result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await Location.requestWhenInUseAuthorization();
    })();
  }, []);

  const onMapPress = async (event: MapPressEvent) => {
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
