import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export type Location = {
  id: string;
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
