import { AntDesign } from '@expo/vector-icons';
import { Input } from '@rneui/themed';
import { Keyboard, Pressable, StyleSheet } from 'react-native';

type Props = {
  raiseBottomSheet: () => void;
};

export const BottomSheetContent = ({ raiseBottomSheet }: Props) => {
  const tapContainer = () => {
    Keyboard.dismiss();
  };

  const onSearchInputFocus = () => {
    raiseBottomSheet();
  };

  return (
    <Pressable style={styles.container} onPress={tapContainer}>
      <Input
        onFocus={onSearchInputFocus}
        inputStyle={{
          fontSize: 16,
        }}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: '#e8e8e8',
          borderRadius: 10,
          paddingHorizontal: 8,
          height: 42,
        }}
        placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
        placeholder="マップで検索"
        leftIcon={
          <AntDesign name="search1" size={16} color={INPUT_PLACEHOLDER_COLOR} />
        }
      />
    </Pressable>
  );
};

const INPUT_PLACEHOLDER_COLOR = '#67686e';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
