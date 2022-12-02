import { atom } from 'jotai';

export type SoundAlarmLocationId = string | null;

export const soundAlarmLocationIdAtom = atom<SoundAlarmLocationId>(null);
