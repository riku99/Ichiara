import { useAtom } from 'jotai';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { alarm } from 'src/sound';
import { locationsAtom } from 'src/stores';
import { soundAlarmLocationIdAtom } from 'src/stores/soundAlarmLocationId';
import { theme } from 'src/styles';

export const AlarmSounding = () => {
  const [soundAlarmLocationId, setSoundAlarmLocationId] = useAtom(
    soundAlarmLocationIdAtom
  );
  const [_, setLocations] = useAtom(locationsAtom);

  const onStopButtonPress = () => {
    setSoundAlarmLocationId(null);
    alarm.stop();
    setLocations((c) => {
      return c.map((locationData) => {
        if (locationData.id === soundAlarmLocationId) {
          return {
            ...locationData,
            isOn: false,
          };
        } else {
          return locationData;
        }
      });
    });
  };

  if (!soundAlarmLocationId) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.alertText}>もうすぐ目的地です</Text>

        <Pressable style={styles.stopButton} onPress={onStopButtonPress}>
          <Text style={styles.stopText}>アラームを止める</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  alertText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  stopButton: {
    backgroundColor: theme.blue,
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 40,
    alignItems: 'center',
  },
  stopText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
});
