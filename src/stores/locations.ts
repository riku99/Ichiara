import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

type Location = {
  lat: number;
  lng: number;
  title: string;
  radius: number;
  vibration: boolean;
};

const storage = createJSONStorage<Location[]>(() => AsyncStorage);
export const locationsAtom = atomWithStorage<Location[]>(
  'locations',
  [],
  storage
);
