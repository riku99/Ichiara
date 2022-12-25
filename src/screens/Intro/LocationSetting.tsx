import { useAtom } from 'jotai';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import { showedIntroAtom } from 'src/stores/showedIntro';
import { SettingButton } from './SettingButtom';
import { commonStyles } from './styles';

export const LocationSetting = () => {
  const [_, setShowedIntro] = useAtom(showedIntroAtom);

  const setShowedIntroTrue = () => {
    setShowedIntro(true);
    storage.set(mmkvStorageKeys.showedIntroKey, true);
  };

  const onSettingButtonPress = async () => {
    setShowedIntroTrue();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[
          commonStyles.text,
          {
            marginTop: 20,
          },
        ]}
      >
        現在地を更新するために位置情報を使用します。
      </Text>

      <Text style={commonStyles.text}>
        ダイアログが表示されたら「Appの使用中は許可」を押した後に「常に許可」を選択してください。
      </Text>

      <SettingButton onPress={onSettingButtonPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
