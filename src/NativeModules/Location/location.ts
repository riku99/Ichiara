import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import { AuthorizationChangedEvent } from './types';

const { LocationManager } = NativeModules;

const LocationEventEmitter = new NativeEventEmitter(LocationManager);

export const locationServicesEnabled = async (): Promise<boolean> => {
  return await LocationManager.locationServicesEnabled();
};

export const requestWhenInUseAuthorization = async (): Promise<void> => {
  await LocationManager.requestWhenInUseAuthorization();
};

export const authorizationChangedListener = (
  listener: (event: AuthorizationChangedEvent) => void
): EmitterSubscription => {
  const emitterSubsctiption = LocationEventEmitter.addListener(
    'onAuthorizationStatusDidChange',
    listener
  );

  return emitterSubsctiption;
};
