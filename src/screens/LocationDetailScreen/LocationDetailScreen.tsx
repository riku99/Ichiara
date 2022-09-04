import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Switch } from 'src/components/Switch';
import { VStack } from 'src/components/VStack';
import { MapView } from 'src/nativeComponents/MapView';
import { locationsAtom } from 'src/stores';
import { formatRadius } from 'src/utils';

type Props = RootNavigationScreenProp<'LocationDetail'>;

export const LocationDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [locations, setLocations] = useAtom(locationsAtom);
  const mapRef = useRef<MapView>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '詳細・編集',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const location = locations.find((l) => l.id === id);

  useEffect(() => {
    if (location) {
      mapRef.current?.annotate({
        lat: location.lat,
        lng: location.lng,
      });
    }
  }, [location]);

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
            <Text style={styles.itemLabel}>場所</Text>
            <Text style={styles.itemText}>{location.title}</Text>
          </View>

          <View>
            <Text style={styles.itemLabel}>お知らせする範囲</Text>
            <Text style={styles.itemText}>{formatRadius(location.radius)}</Text>
          </View>

          <View>
            <Text style={styles.itemLabel}>バイブレーション</Text>
            <Switch value={location.vibration} />
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
});

export const LocationDetailScreenWithSuspense = (props: Props) => {
  return (
    <Suspense>
      <LocationDetailScreen {...props} />
    </Suspense>
  );
};
