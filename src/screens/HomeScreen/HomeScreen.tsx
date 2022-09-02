import BottomSheet from '@gorhom/bottom-sheet';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { MapPressEvent, MapView } from 'src/NativeComponents/MapView';
import * as Location from 'src/NativeModules/Location';
import { BottomSheetContent } from './BottonSheetContent';
import { LocationBottomSheetContent } from './LocationBottomSheetConent';
import { SelectedLocation } from './type';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  const mapRef = useRef<MapView>(null);
  const searchBottomSheetRef = useRef<BottomSheet>(null);
  const locationBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['12', '25%', '90%'], []);
  const [
    initialLocation,
    setInitialLocation,
  ] = useState<null | Location.Location>(null);
  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState<null | SelectedLocation>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentLocation();
    setInitialLocation(location);
  };

  useEffect(() => {
    const subscription = Location.authorizationChangedListener(
      async (event) => {
        switch (event.status) {
          case 'authorizedWhenInUse':
            await Location.requestAlwaysAuthorization();
            await getCurrentLocation();
            break;
          case 'authorizedAlways':
            await getCurrentLocation();
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

  useEffect(() => {
    (async () => {
      await Location.requestWhenInUseAuthorization();
    })();
  }, []);

  useEffect(() => {
    if (!selectedLocation) {
      locationBottomSheetRef.current?.close();
    }
  }, [selectedLocation]);

  const onMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude, address } = event.nativeEvent;
    Promise.all([
      mapRef.current?.removeAllAnnotations(),
      mapRef.current?.annotate({ lat: latitude, lng: longitude }),
    ]);
    setSelectedLocation({
      lat: latitude,
      lng: longitude,
      title: address,
    });
  };

  const raiseBottomSheet = () => {
    searchBottomSheetRef.current?.snapToIndex(2);
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index !== 2) {
      Keyboard.dismiss();
    }
  }, []);

  const searchLocation = async (text: string) => {
    return await mapRef.current?.searchLocation(text);
  };

  const searchCoodinate = async (query: string) => {
    return await mapRef.current?.searchCoodinate(query);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        onMapPress={onMapPress}
        ref={mapRef}
        showUserLocationPoint={true}
        customRegion={
          initialLocation && {
            ...initialLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        }
      />

      {!selectedLocation && (
        <BottomSheet
          ref={searchBottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetHandleIndicator}
          onChange={handleSheetChanges}
        >
          <BottomSheetContent
            raiseBottomSheet={raiseBottomSheet}
            mapRef={mapRef}
            setSelectedLocation={setSelectedLocation}
          />
        </BottomSheet>
      )}

      <BottomSheet
        ref={locationBottomSheetRef}
        index={!selectedLocation ? -1 : 1}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandleIndicator}
      >
        <LocationBottomSheetContent
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          mapRef={mapRef}
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
