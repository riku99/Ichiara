import { AntDesign } from '@expo/vector-icons';
import { Input, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { SearchLocationResult } from 'src/NativeComponents/MapView';

type Props = {
  raiseBottomSheet: () => void;
  searchLocation: (text: string) => Promise<SearchLocationResult>;
};

export const BottomSheetContent = ({
  raiseBottomSheet,
  searchLocation,
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
    const result = await searchLocation(text);
    setSuggestedLocation(result);
  };

  return (
    <Pressable style={styles.container} onPress={tapContainer}>
      <Input
        onChangeText={onChangeSearchInputText}
        onFocus={onSearchInputFocus}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
        placeholder="マップで検索"
        leftIcon={
          <AntDesign
            name="search1"
            size={SEARCH_INPUT_TEXT_SIZE}
            color={INPUT_PLACEHOLDER_COLOR}
          />
        }
      />
      {suggestedLocation.map((location, index) => (
        <React.Fragment key={index}>
          {location.title && (
            <View>
              <Text>{location.title}</Text>
              <Text>{location.subtitle ?? ''}</Text>
            </View>
          )}
        </React.Fragment>
      ))}
    </Pressable>
  );
};

const INPUT_PLACEHOLDER_COLOR = '#67686e';
const SEARCH_INPUT_TEXT_SIZE = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 42,
  },
  inputStyle: {
    fontSize: SEARCH_INPUT_TEXT_SIZE,
  },
});
