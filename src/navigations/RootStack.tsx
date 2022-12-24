import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import { IntroScreen } from 'src/screens/Intro';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import { showedIntroAtom } from 'src/stores/showedIntro';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
  Intro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const [showedIntro] = useAtom(showedIntroAtom);
  const showedIntroFromStorage = storage.getBoolean(
    mmkvStorageKeys.showedIntroKey
  );

  return (
    <Stack.Navigator>
      {!showedIntro && !showedIntroFromStorage && (
        <Stack.Screen name="Intro" component={IntroScreen} />
      )}
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
