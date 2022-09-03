import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Loading } from 'src/components/Loading';
import { Location as StoredLocation, locationsAtom } from 'src/stores';

type Props = RootNavigationScreenProp<'BottomTab'>;

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

  const renderItem = useCallback(({ item }: { item: StoredLocation }) => {
    return (
      <Pressable style={styles.locationItemContainer}>
        <Text style={styles.locationTitle}>{item.title}</Text>
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={() => <View style={styles.suggestedListFotter} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
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
    marginTop: 20,
  },
  locationItemContainer: {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e3e3e3',
    paddingBottom: 10,
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
