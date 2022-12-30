import { atom } from 'jotai';

export type ShowedAuthAlert = boolean;

export const showedAuthAlertAtom = atom<ShowedAuthAlert>(false);
