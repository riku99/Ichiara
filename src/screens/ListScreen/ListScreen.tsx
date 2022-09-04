import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Loading } from 'src/components/Loading';
import { Location as StoredLocation, locationsAtom } from 'src/stores';

type Props = RootNavigationScreenProp<'List'>;

const ListScreen = ({ navigation }: Props) => {
  const [locations] = useAtom(locationsAtom);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'お知らせする場所',
    });
  }, [navigation]);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  const renderItem = useCallback(
    ({ item }: { item: StoredLocation }) => {
      const onPress = () => {
        navigation.navigate('LocationDetail');
      };

      return (
        <Pressable onPress={onPress}>
          {({ pressed }) => (
            <View
              style={[
                styles.locationItemContainer,
                { backgroundColor: pressed ? '#f2f2f2' : undefined },
              ]}
            >
              <Text style={styles.locationTitle}>{item.title}</Text>
            </View>
          )}
        </Pressable>
      );
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={() => <View style={styles.suggestedListFotter} />}
        // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingLeft: 16,
    marginTop: 10,
  },
  locationItemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e3e3e3',
    paddingVertical: 20,
  },
  locationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  suggestedListFotter: {
    height: 16,
  },
  itemSeparator: {
    height: 10,
  },
});

export const ListScreenWithSuspense = (props: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <ListScreen {...props} />
    </Suspense>
  );
};
