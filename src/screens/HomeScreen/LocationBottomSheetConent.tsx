import { AntDesign } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
  mapRef,
}: Props) => {
  const onClosePress = () => {
    setSelectedLocation(null);
    mapRef.current?.removeAllAnnotations();
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
});
