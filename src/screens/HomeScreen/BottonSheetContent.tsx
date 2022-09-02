import { AntDesign } from '@expo/vector-icons';
import { Input, Text } from '@rneui/themed';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  MapView,
  SearchLocationResult,
  SearchLocationResultData,
} from 'src/NativeComponents/MapView';
import { SelectedLocation } from './type';

type Props = {
  raiseBottomSheet: () => void;
  setSelectedLocation: (l: SelectedLocation) => void;
  mapRef: React.MutableRefObject<MapView>;
};

export const BottomSheetContent = ({
  raiseBottomSheet,
  setSelectedLocation,
  mapRef,
}: Props) => {
  const [
    suggestedLocation,
    setSuggestedLocation,
  ] = useState<SearchLocationResult>([]);

  const tapContainer = () => {
    Keyboard.dismiss();
  };

  const onSearchInputFocus = () => {
    raiseBottomSheet();
  };

  const onChangeSearchInputText = async (text: string) => {
    const result = await mapRef.current?.searchLocation(text);
    setSuggestedLocation(result);
  };

  const renderSuggestedLocation = useCallback(
    ({ item }: { item: SearchLocationResultData }) => {
      if (!item.title || !item.subtitle || item.subtitle === '近くを検索') {
        return null;
      }

      const onItemPress = async () => {
        const result = await mapRef.current?.searchCoodinate(item.subtitle);
        setSelectedLocation({
          title: item.title,
          lat: result.latitude,
          lng: result.longitude,
        });
      };

      return (
        <Pressable style={styles.suggestedLocation} onPress={onItemPress}>
          <Text style={styles.suggestedLocationTitle}>{item.title}</Text>
          <Text style={styles.suggestedLocationSubtitle}>{item.subtitle}</Text>
        </Pressable>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={tapContainer}>
        <>
          <Input
            onChangeText={onChangeSearchInputText}
            onFocus={onSearchInputFocus}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            containerStyle={styles.searchInputContainer}
            placeholder="マップで検索"
            leftIcon={
              <AntDesign
                name="search1"
                size={SEARCH_INPUT_TEXT_SIZE}
                color={INPUT_PLACEHOLDER_COLOR}
              />
            }
          />

          <FlatList
            data={suggestedLocation}
            renderItem={renderSuggestedLocation}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestedLocationList}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListFooterComponent={() => (
              <View style={styles.suggestedListFotter} />
            )}
          />
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

const INPUT_PLACEHOLDER_COLOR = '#67686e';
const SEARCH_INPUT_TEXT_SIZE = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  searchInputContainer: {
    paddingHorizontal: 0,
    height: 42,
    paddingRight: 16,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 42,
  },
  input: {
    fontSize: SEARCH_INPUT_TEXT_SIZE,
  },
  suggestedLocationList: {
    marginTop: 20,
  },
  suggestedListFotter: {
    height: 16,
  },
  suggestedLocation: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e3e3e3',
    paddingBottom: 10,
  },
  suggestedLocationTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  suggestedLocationSubtitle: {
    marginTop: 4,
  },
  itemSeparator: {
    height: 10,
  },
});
