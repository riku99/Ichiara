import { atom } from 'jotai';

export type Showedintro = boolean;

export const showedIntroAtom = atom<Showedintro>(false);
