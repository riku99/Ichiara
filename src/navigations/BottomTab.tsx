import { AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreenWithSuspense } from 'src/screens/HomeScreen';
import { ListStack } from './ListStack';

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
        component={ListStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={ICON_SIZE} color={color} />
          ),
          tabBarLabel: 'リスト',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const ICON_SIZE = 24;
