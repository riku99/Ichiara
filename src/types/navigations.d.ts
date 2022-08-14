type AllStackParamList = import('../navigations/RootStack').RootStackParamList;

type RootNavigationScreenProp<
  T extends keyof AllStackParamList
> = import('@react-navigation/native-stack').NativeStackScreenProps<
  AllStackParamList,
  T
>;

type RootNavigationProp<
  T extends keyof AllStackParamList
> = import('@react-navigation/native-stack').NativeStackNavigationProp;
