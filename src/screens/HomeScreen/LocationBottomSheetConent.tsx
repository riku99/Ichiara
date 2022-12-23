import { AntDesign } from '@expo/vector-icons';
import { Button, Text } from '@rneui/themed';
import { isPointWithinRadius } from 'geolib';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { useToast } from 'react-native-toast-notifications';
import { RadiusMenu } from 'src/components/RadiusMenu';
import { MapView } from 'src/nativeComponents/MapView';
import { getCurrentLocation } from 'src/nativeModules/Location';
import { locationsAtom } from 'src/stores';
import { formatRadius } from 'src/utils';
import { SelectedLocation } from './type';

type Props = {
  selectedLocation: SelectedLocation | null;
  setSelectedLocation: (l: SelectedLocation | null) => void;
  mapRef: React.RefObject<MapView>;
  radius: number;
  setRadius: (n: number) => void;
};

export const LocationBottomSheetContent = ({
  selectedLocation,
  setSelectedLocation,
  radius,
  setRadius,
}: Props) => {
  const [vibration, setVibration] = useState(true);
  const [locations, setLocations] = useAtom(locationsAtom);
  const toast = useToast();

  const onClosePress = () => {
    setSelectedLocation(null);
  };

  const onReistrationButtonPress = async () => {
    try {
      if (!selectedLocation) {
        return;
      }

      const currentPosition = await getCurrentLocation();
      const inRadius = isPointWithinRadius(
        currentPosition,
        selectedLocation,
        radius
      );

      if (inRadius) {
        Alert.alert(
          '登録できませんでした',
          '既に半径内にユーザーがいる場合は登録できません。'
        );
        return;
      }

      const base =
        selectedLocation.lat.toString() + selectedLocation.lng.toString();
      const id = btoa(base);
      const sameIdLocation = locations.some((l) => l.id === id);
      if (sameIdLocation) {
        Alert.alert('同じ場所を複数登録することはできません。');
        return;
      }
      setLocations((c) => {
        const newData = {
          ...selectedLocation,
          id,
          radius,
          vibration,
          isOn: true,
        };
        const newLocations = [newData, ...c];
        return newLocations;
      });

      toast.show('登録しました');
    } catch (e) {
      console.log(e);
    }
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
          <RadiusMenu
            onChangeRadius={(radius: number) => {
              setRadius(radius);
            }}
          >
            <Pressable>
              <Text style={styles.itemLabel}>お知らせする範囲</Text>
              <Text style={[styles.radius, styles.item]}>
                {formatRadius(radius)}
              </Text>
            </Pressable>
          </RadiusMenu>

          <View>
            <Text style={styles.itemLabel}>バイブレーション</Text>
            <Switch
              style={[styles.item]}
              value={vibration}
              onValueChange={(v) => {
                setVibration(v);
              }}
              trackColor={{
                true: '#5294ff',
              }}
            />
          </View>
        </View>

        <Button
          containerStyle={styles.registrationButtonContainer}
          title="登録する"
          titleStyle={styles.registrationButtonTitle}
          buttonStyle={styles.registrationButton}
          onPress={onReistrationButtonPress}
        />
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
  content2: {
    marginTop: 24,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 16,
  },
  item: {
    marginTop: 6,
  },
  radius: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  registrationButtonContainer: {
    marginTop: 50,
  },
  registrationButtonTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  registrationButton: {
    height: 46,
    backgroundColor: '#5294ff',
  },
});
