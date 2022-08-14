import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from 'src/screens/HomeScreen';
import { ListScreen } from 'src/screens/ListScreen';

export type BottomTabParamList = {
  HomeTab: undefined;
  ListTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="ListTab" component={ListScreen} />
    </Tab.Navigator>
  );
};
