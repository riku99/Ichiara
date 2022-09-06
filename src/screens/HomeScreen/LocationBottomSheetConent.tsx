import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { MenuAction, MenuView } from '@react-native-menu/menu';
import { Button, Text } from '@rneui/themed';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { MapView } from 'src/nativeComponents/MapView';
import { locationsAtom } from 'src/stores';
import { formatRadius } from 'src/utils';
import { SelectedLocation } from './type';

type Props = {
  selectedLocation: SelectedLocation | null;
  setSelectedLocation: (l: SelectedLocation) => void;
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [, setLocations] = useAtom(locationsAtom);

  useEffect(() => {
    setIsFavorited(false);
  }, [selectedLocation]);

  const onClosePress = () => {
    setSelectedLocation(null);
  };

  const radiusMenuActions: MenuAction[] = [
    {
      id: 'custom',
      title: 'カスタム',
    },
    {
      id: '2000',
      title: '2km',
    },
    {
      id: '1000',
      title: '1km',
    },
    {
      id: '500',
      title: '500m',
    },
    {
      id: '300',
      title: '300m',
    },
  ];

  const onRadiusMenuActionPress = (id: string) => {
    switch (id) {
      case '300':
        setRadius(300);
        break;
      case '500':
        setRadius(500);
        break;
      case '1000':
        setRadius(1000);
        break;
      case '2000':
        setRadius(2000);
        break;
      case 'custom':
        Alert.prompt(
          'お知らせする範囲をメートルで入力してください',
          '',
          [
            {
              text: 'キャンセル',
              style: 'cancel',
            },
            {
              text: '設定',
              onPress: (input) => {
                const r = Number(input);
                if (r) {
                  if (r < 300 || r > 3000) {
                    Alert.alert('設定できる範囲は300m以上3km以下です');
                    return;
                  }
                  setRadius(r);
                } else {
                  Alert.alert('入力値が不正です');
                }
              },
            },
          ],
          'plain-text',
          '',
          'number-pad'
        );
    }
  };

  const onReistrationButtonPress = () => {
    const base =
      selectedLocation.lat.toString() + selectedLocation.lng.toString();
    const id = btoa(base);
    setLocations((c) => {
      const newData = {
        ...selectedLocation,
        id,
        radius,
        vibration,
        isFavorited,
      };
      const newLocations = [newData, ...c];
      return newLocations;
    });
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
          {/* @ts-ignore https://github.com/react-native-menu/menu/pull/416  */}
          <MenuView
            actions={radiusMenuActions}
            onPressAction={({ nativeEvent }) => {
              onRadiusMenuActionPress(nativeEvent.event);
            }}
          >
            <Pressable>
              <Text style={styles.itemLabel}>お知らせする範囲</Text>
              <Text style={[styles.radius, styles.item]}>
                {formatRadius(radius)}
              </Text>
            </Pressable>
          </MenuView>

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

        <View style={styles.content2}>
          <Text style={styles.itemLabel}>お気に入り</Text>
          <Pressable
            onPress={() => {
              setIsFavorited((c) => !c);
            }}
            style={{ width: 26 }}
          >
            <FontAwesome
              name={isFavorited ? 'bookmark' : 'bookmark-o'}
              size={26}
              color={isFavorited ? '#ffc738' : '#2b2b2b'}
              style={[styles.item]}
            />
          </Pressable>
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
    marginTop: 90,
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
