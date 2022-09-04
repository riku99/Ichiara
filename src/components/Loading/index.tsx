import { ActivityIndicator, StyleSheet } from 'react-native';

export const Loading = () => {
  return <ActivityIndicator style={styles.indicator} />;
};

const styles = StyleSheet.create({
  indicator: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
