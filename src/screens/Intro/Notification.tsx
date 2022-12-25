import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { SettingButton } from './SettingButtom';
import { commonStyles } from './styles';

type Props = {
  goToScoundPage: () => void;
};

export const Notification = ({ goToScoundPage }: Props) => {
  const onSettingButtonPress = async () => {
    await PushNotificationIOS.requestPermissions({
      alert: true,
      sound: true,
      critical: true,
    });

    goToScoundPage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>はじめに</Text>
      <Text style={commonStyles.text}>
        目的地付近であることをお知らせするためにプッシュ通知を使用します。
      </Text>
      <Text style={commonStyles.text}>プッシュ通知を有効にしてください。</Text>

      <SettingButton onPress={onSettingButtonPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    marginTop: 20,
  },
});
