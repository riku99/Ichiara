import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useCallback, useLayoutEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Loading } from 'src/components/Loading';
import { Switch } from 'src/components/Switch';
import { Location as StoredLocation, locationsAtom } from 'src/stores';

type Props = RootNavigationScreenProp<'List'>;

const ListScreen = ({ navigation }: Props) => {
  const [locations, setLocations] = useAtom(locationsAtom);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '登録されている場所',
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
                { backgroundColor: pressed ? '#f2f2f2' : '#fff' },
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

  const renderHiddenItem = useCallback(({ item }: { item: StoredLocation }) => {
    return (
      <Pressable style={styles.rowBack}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteText}>削除</Text>
        </View>
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      <SwipeListView
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={() => <View style={styles.suggestedListFotter} />}
        rightOpenValue={-80}
        disableRightSwipe
        renderHiddenItem={renderHiddenItem}
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
  deleteButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fc2519',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
});

export const ListScreenWithSuspense = (props: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <ListScreen {...props} />
    </Suspense>
  );
};
