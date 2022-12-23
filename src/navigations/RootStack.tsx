import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroScreen } from 'src/screens/Intro';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
  Intro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Intro" component={IntroScreen} />
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
