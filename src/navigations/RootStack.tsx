import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};
