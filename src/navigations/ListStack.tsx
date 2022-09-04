import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListScreenWithSuspense } from 'src/screens/ListScreen';
import { LocationDetailScreenWithSuspense } from 'src/screens/LocationDetailScreen';

export type ListStackParamList = {
  List: undefined;
  LocationDetail: {
    id: string;
  };
};

const Stack = createNativeStackNavigator<ListStackParamList>();

export const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreenWithSuspense} />
      <Stack.Screen
        name="LocationDetail"
        component={LocationDetailScreenWithSuspense}
      />
    </Stack.Navigator>
  );
};
