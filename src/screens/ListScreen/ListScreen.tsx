import { useAtom } from 'jotai';
import { Suspense, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Loading } from 'src/components/Loading';
import { locationsAtom } from 'src/stores';

const ListScreen = () => {
  const [locations] = useAtom(locationsAtom);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <View>
      {locations.map((l, index) => {
        return <Text key={index}>{l.title}</Text>;
      })}
    </View>
  );
};

export const ListScreenWithSuspense = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ListScreen />
    </Suspense>
  );
};
