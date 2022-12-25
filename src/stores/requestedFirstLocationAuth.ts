import { atom } from 'jotai';

export type RequestedFirstLocationAuth = boolean;

export const requestedFirstLocationAuthAtom = atom<boolean>(false);
