import BottomSheet from '@gorhom/bottom-sheet';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { MapPressEvent, MapView } from 'src/NativeComponents/MapView';
import * as Location from 'src/NativeModules/Location';
import { BottomSheetContent } from './BottonSheetContent';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['12', '25%', '90%'], []);

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

  const raiseBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index !== 2) {
      Keyboard.dismiss();
    }
  }, []);

  const searchLocation = async (text: string) => {
    return await mapRef.current?.searchLocation(text);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.mapView} onMapPress={onMapPress} ref={mapRef} />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandleIndicator}
        onChange={handleSheetChanges}
      >
        <BottomSheetContent
          raiseBottomSheet={raiseBottomSheet}
          searchLocation={searchLocation}
        />
      </BottomSheet>
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
  bottomSheetBackground: {
    backgroundColor: '#fcfcfc',
  },
  bottomSheetHandleIndicator: {
    backgroundColor: '#ababab',
  },
});
