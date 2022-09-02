import { AntDesign } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import React from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { MapView } from 'src/NativeComponents/MapView';
import { SelectedLocation } from './type';

type Props = {
  selectedLocation: SelectedLocation | null;
  setSelectedLocation: (l: SelectedLocation) => void;
  mapRef: React.RefObject<MapView>;
};

export const LocationBottomSheetContent = ({
  selectedLocation,
  setSelectedLocation,
}: Props) => {
  const onClosePress = () => {
    setSelectedLocation(null);
  };

  if (!selectedLocation) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{selectedLocation.title}</Text>
        <Pressable style={styles.closeButton} onPress={onClosePress}>
          <AntDesign name="close" size={20} color="black" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.content1}>
          <View>
            <Text style={styles.itemLabel}>距離</Text>
            <Pressable>
              <Text style={[styles.radius, styles.item]}>500m</Text>
            </Pressable>
          </View>

          <View>
            <Text style={styles.itemLabel}>バイブレーション</Text>
            <Switch style={[styles.item]} value={true} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    width: '70%',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: '#ced3db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  content1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 16,
  },
  item: {
    marginTop: 4,
  },
  radius: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
