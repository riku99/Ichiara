import { Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import { Suspense, useCallback, useLayoutEffect } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
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
    const onDeleteButtonPress = () => {
      Alert.alert('削除してよろしいですか?', '', [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除',
          style: 'destructive',
          onPress: () => {
            setLocations((c) => c.filter((l) => l.id !== item.id));
          },
        },
      ]);
    };

    return (
      <View style={styles.rowBack}>
        <Pressable style={styles.deleteButton} onPress={onDeleteButtonPress}>
          <Text style={styles.deleteText}>削除</Text>
        </Pressable>
      </View>
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
    flexShrink: 1,
  },
  suggestedListFotter: {
    height: 16,
  },
  itemSeparator: {
    height: 10,
  },
  deleteButton: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fc2519',
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export const ListScreenWithSuspense = (props: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <ListScreen {...props} />
    </Suspense>
  );
};
