import { AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreenWithSuspense } from 'src/screens/HomeScreen';
import { ListScreenWithSuspense } from 'src/screens/ListScreen';

export type BottomTabParamList = {
  HomeTab: undefined;
  ListTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreenWithSuspense}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={ICON_SIZE} color={color} />
          ),
          tabBarLabel: 'ホーム',
        }}
      />
      <Tab.Screen
        name="ListTab"
        component={ListScreenWithSuspense}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={ICON_SIZE} color={color} />
          ),
          tabBarLabel: 'リスト',
        }}
      />
    </Tab.Navigator>
  );
};

const ICON_SIZE = 24;
