import { atom } from 'jotai';

type Location = {
  lat: number;
  lng: number;
  title: string;
  radius: number;
  vibration: boolean;
};

export const locationsAtom = atom<Location[]>([]);
