import { useEffect, useLayoutEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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
    const subscription = Location.authorizationChangedListener(
      async (event) => {
        switch (event.status) {
          case 'authorizedWhenInUse':
            await Location.requestAlwaysAuthorization();
            break;
          case 'denied':
            Alert.alert(
              '位置情報の使用が許可されていません',
              'アプリを使用するには端末の設定から位置情報をオンにしてください。'
            );
        }
      }
    );

    return () => {
      subscription.remove();
    };
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
