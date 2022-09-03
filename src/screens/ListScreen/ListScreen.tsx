import { useAtom } from 'jotai';
import { Text, View } from 'react-native';
import { locationsAtom } from 'src/stores';

export const ListScreen = () => {
  const [locations] = useAtom(locationsAtom);

  return (
    <View>
      {locations.map((l, index) => {
        return <Text key={index}>{l.title}</Text>;
      })}
    </View>
  );
};
