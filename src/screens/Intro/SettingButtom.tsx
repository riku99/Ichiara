import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  onPress: () => void;
};

export const SettingButton = ({ onPress }: Props) => {
  return (
    <Pressable style={styles.introButton} onPress={onPress}>
      <Text style={styles.introButtonText}>設定</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  introButton: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    backgroundColor: theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    alignSelf: 'center',
    marginTop: 44,
  },
  introButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
