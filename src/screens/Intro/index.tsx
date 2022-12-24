import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useAtom } from 'jotai';
import { useLayoutEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import * as Location from 'src/nativeModules/Location';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import { showedIntroAtom } from 'src/stores/showedIntro';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'Intro'>;

export const IntroScreen = ({ navigation }: Props) => {
  const [_, setShowedIntro] = useAtom(showedIntroAtom);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onPress = async () => {
    await PushNotificationIOS.requestPermissions({
      alert: true,
      sound: true,
      critical: true,
    });

    await Location.requestWhenInUseAuthorization();

    setShowedIntro(true);
    storage.set(mmkvStorageKeys.showedIntroKey, true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>注意点</Text>
      <Text style={styles.text}>・ このアプリでは位置情報を使用します。</Text>
      <Text style={[styles.text]}>
        ・
        ダイアログが表示されたら「Appの使用中は許可」を押した後に「常に許可」を選択してください。
      </Text>
      <Text style={styles.text}>
        ・ 目的地付近であることをお知らせするためにプッシュ通知を使用します。
      </Text>
      <Text style={styles.text}>
        ・
        地下にいる時など位置情報を正確に取得できない場合正常に動作しない可能性があります。
      </Text>
      <Pressable style={styles.introButton} onPress={onPress}>
        <Text style={styles.introButtonText}>OK</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    marginTop: 12,
  },
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
