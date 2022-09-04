import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListScreenWithSuspense } from 'src/screens/ListScreen';
import { LocationDetailScreen } from 'src/screens/LocationDetailScreen';

export type ListStackParamList = {
  List: undefined;
  LocationDetail: undefined;
};

const Stack = createNativeStackNavigator<ListStackParamList>();

export const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreenWithSuspense} />
      <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
    </Stack.Navigator>
  );
};
