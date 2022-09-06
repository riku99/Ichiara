import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useCallback, useLayoutEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Switch, View } from 'react-native';
import { Loading } from 'src/components/Loading';
import { Location as StoredLocation, locationsAtom } from 'src/stores';

type Props = RootNavigationScreenProp<'List'>;

const ListScreen = ({ navigation }: Props) => {
  const [locations, setLocations] = useAtom(locationsAtom);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'お知らせする場所',
    });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: StoredLocation }) => {
      const onPress = () => {
        navigation.navigate('LocationDetail', { id: item.id });
      };

      const onSwitchChange = (value: boolean) => {
        setLocations((c) => {
          const newData = c.map((l) => {
            if (l.id === item.id) {
              return {
                ...l,
                isOn: value,
              };
            } else {
              return l;
            }
          });
          return newData;
        });
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
              <Switch value={item.isOn} onValueChange={onSwitchChange} />
            </View>
          )}
        </Pressable>
      );
    },
    [navigation, setLocations]
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
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
