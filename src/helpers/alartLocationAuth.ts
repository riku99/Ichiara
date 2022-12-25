import { Alert, Linking } from 'react-native';

export const alartLocationAuth = () => {
  Alert.alert(
    '位置情報を使用できません',
    '位置情報の設定を「常に」に変更してください。',
    [
      {
        text: '設定する',
        onPress: () => {
          Linking.openSettings();
        },
      },
    ]
  );
};
