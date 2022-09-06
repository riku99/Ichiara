import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RadiusMenu } from 'src/components/RadiusMenu';
import { Switch } from 'src/components/Switch';
import { VStack } from 'src/components/VStack';
import { MapView } from 'src/nativeComponents/MapView';
import { locationsAtom } from 'src/stores';
import { theme } from 'src/styles';
import { formatRadius } from 'src/utils';

type Props = RootNavigationScreenProp<'LocationDetail'>;

export const LocationDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [locations, setLocations] = useAtom(locationsAtom);
  const [location, setLocation] = useState(locations.find((l) => l.id === id));
  const mapRef = useRef<MapView>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (location) {
        setLocations((c) => {
          const newData = c.map((l) => {
            if (l.id === id) {
              return location;
            } else {
              return l;
            }
          });

          return newData;
        });
      }
    } else {
      isFirstRender.current = false;
    }
  }, [location]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '詳細・編集',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (location) {
      (async () => {
        await mapRef.current?.removeCurrentCircle();
        mapRef.current?.annotate({
          lat: location.lat,
          lng: location.lng,
        });
        mapRef.current?.showCircle({
          lat: location.lat,
          lng: location.lng,
          radius: location.radius,
        });
      })();
    }
  }, [location.lat, location.lng, location.radius]);

  const onVibrationChange = (value: boolean) => {
    setLocation({
      ...location,
      vibration: value,
    });
  };

  const onChangeRadius = (radius: number) => {
    setLocation({
      ...location,
      radius,
    });
  };

  if (!location) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <MapView
          ref={mapRef}
          style={styles.map}
          customRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showUserLocationPoint={true}
        />
        <VStack space={22} style={styles.contents}>
          <View>
            <Text style={styles.itemLabel}>
              場所{'  '}
              <Text style={styles.locatoinAlertText}>
                ※場所を変更することはできません
              </Text>
            </Text>
            <Text style={styles.itemText}>{location.title}</Text>
          </View>

          <RadiusMenu onChangeRadius={onChangeRadius}>
            <View>
              <Text style={styles.itemLabel}>お知らせする範囲</Text>
              <Text style={styles.itemText}>
                {formatRadius(location.radius)}
              </Text>
            </View>
          </RadiusMenu>

          <View>
            <Text style={styles.itemLabel}>バイブレーション</Text>
            <Switch
              value={location.vibration}
              onValueChange={onVibrationChange}
            />
          </View>
        </VStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 140,
  },
  contents: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: '#9e9e9e',
    fontSize: 16,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.blue,
  },
  locatoinAlertText: {
    fontSize: 12,
    color: '#9e9e9e',
    fontWeight: 'normal',
  },
});

export const LocationDetailScreenWithSuspense = (props: Props) => {
  return (
    <Suspense>
      <LocationDetailScreen {...props} />
    </Suspense>
  );
};
