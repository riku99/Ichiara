import { useAtom } from 'jotai';
import { Alert, Linking } from 'react-native';
import { showedAuthAlertAtom } from 'src/stores';

export const useAlertLocationAuth = () => {
  const [showedAuthAlert, setShowedAuthAlert] = useAtom(showedAuthAlertAtom);

  const alertLocationAuth = () => {
    if (!showedAuthAlert) {
      setShowedAuthAlert(true);

      Alert.alert(
        '位置情報を使用できません',
        '位置情報の設定を「常に」に変更してください。',
        [
          {
            text: '設定する',
            onPress: () => {
              Linking.openSettings();
              setShowedAuthAlert(false);
            },
          },
        ]
      );
    }
  };

  return {
    alertLocationAuth,
  };
};
