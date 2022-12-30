import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const mmkvStorageKeys = {
  showedIntroKey: 'showedIntroKey',
  requestedFirstLocationAuth: 'requestedFirstLocationAuth',
  calledFirstActiveToAuthStatus: 'calledFirstActiveToAuthStatus',
};
