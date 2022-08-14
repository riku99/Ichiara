import { useLayoutEffect } from 'react';
import { requireNativeComponent, StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'BottomTab'>;

const NativeMap = requireNativeComponent('Map');

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <NativeMap style={styles.mapView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});
