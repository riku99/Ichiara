import BottomSheet from '@gorhom/bottom-sheet';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Text } from '@rneui/themed';
import { isPointWithinRadius } from 'geolib';
import { useAtom } from 'jotai';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Keyboard,
  Linking,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import { MapPressEvent, MapView, Region } from 'src/nativeComponents/MapView';
import * as Location from 'src/nativeModules/Location';
import { alarm } from 'src/sound';
import { locationsAtom } from 'src/stores';
import { soundAlarmLocationIdAtom } from 'src/stores/';
import { BottomSheetContent } from './BottonSheetContent';
import { LocationBottomSheetContent } from './LocationBottomSheetConent';
import { SelectedLocation } from './type';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  const isInitialRender = useRef(true);
  const mapRef = useRef<MapView>(null);
  const searchBottomSheetRef = useRef<BottomSheet>(null);
  const locationBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['12%', '35%', '90%'], []);
  const [region, setRegion] = useState<undefined | Region>(undefined);
  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState<null | SelectedLocation>(null);
  const [radius, setRadius] = useState(500);
  const [registeredLocations] = useAtom(locationsAtom);
  const [soundAlarmLocationId, setSoundAlarmLocationId] = useAtom(
    soundAlarmLocationIdAtom
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentLocation();
    setRegion(location);
  };

  useEffect(() => {
    const getStatus = async () => {
      const status = await Location.getAuthorizationStatus();
      if (status === 'authorizedAlways') {
        Alert.alert(
          '位置情報を使用できません',
          '位置情報の設定を「常に」に変更してください。',
          [
            {
              text: '設定する',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]
        );
      }
    };

    getStatus();
  }, []);

  useEffect(() => {
    if (!selectedLocation) {
      (async () => {
        if (isInitialRender.current) {
          isInitialRender.current = false;
          return;
        } else {
          locationBottomSheetRef.current?.close();
          await Promise.all([
            mapRef.current?.removeCurrentCircle(),
            mapRef.current?.removeAllAnnotations(),
          ]);
        }
      })();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedLocation) {
      (async () => {
        await mapRef.current?.annotate({
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        }),
          setRegion({
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          });
      })();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedLocation && radius) {
      (async () => {
        await mapRef.current?.removeCurrentCircle(),
          mapRef.current?.showCircle({
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
            radius: radius,
          });
      })();
    }
  }, [selectedLocation, radius]);

  // 自分の位置情報が更新された際の処理
  useEffect(() => {
    const subscription = Location.locationUpdateListener(
      async (eventLocation) => {
        try {
          registeredLocations.forEach((locationData) => {
            const inRadius = isPointWithinRadius(
              eventLocation,
              { latitude: locationData.lat, longitude: locationData.lng },
              locationData.radius
            );

            console.log('inRadius is ' + inRadius + ' ' + new Date());
            if (inRadius && locationData.isOn) {
              if (!soundAlarmLocationId) {
                PushNotificationIOS.addNotificationRequest({
                  id: 'nearDestinationNotification',
                  title: 'もうすぐ目的地です',
                });
                setSoundAlarmLocationId(locationData.id);
                alarm.play((success) => {
                  if (success) {
                    setSoundAlarmLocationId(null);
                  } else {
                    console.log('playback failed due to audio decoding errors');
                  }
                });

                if (locationData.vibration) {
                  let vibrationCount = 0;

                  const id = setInterval(() => {
                    if (vibrationCount < 5) {
                      Vibration.vibrate();
                      vibrationCount += 1;
                    } else {
                      clearInterval(id);
                    }
                  }, 1000);
                }
              }
              return;
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [registeredLocations, soundAlarmLocationId, setSoundAlarmLocationId]);

  const onMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude, address } = event.nativeEvent;
    if (!address) {
      return;
    }

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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        onMapPress={onMapPress}
        ref={mapRef}
        showUserLocationPoint
        customRegion={
          region && {
            ...region,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
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
          radius={radius}
          setRadius={setRadius}
        />
      </BottomSheet>
    </View>
  );
};

export const HomeScreenWithSuspense = (props: Props) => {
  return (
    <Suspense fallback={<Text>読み込み中...</Text>}>
      <HomeScreen {...props} />
    </Suspense>
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
