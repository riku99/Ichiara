import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { VStack } from 'src/components/VStack';
import { locationsAtom } from 'src/stores';
import { formatRadius } from 'src/utils';

type Props = RootNavigationScreenProp<'LocationDetail'>;

export const LocationDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [locations, setLocations] = useAtom(locationsAtom);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '詳細',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const location = locations.find((l) => l.id === id);

  if (!location) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contents}>
        <VStack space={22}>
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
