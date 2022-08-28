import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import { AuthorizationChangedEvent, Location } from './types';

const { LocationManager } = NativeModules;

const LocationEventEmitter = new NativeEventEmitter(LocationManager);

export const locationServicesEnabled = async (): Promise<boolean> => {
  return await LocationManager.locationServicesEnabled();
};

export const requestWhenInUseAuthorization = async (): Promise<void> => {
  await LocationManager.requestWhenInUseAuthorization();
};

export const requestAlwaysAuthorization = async (): Promise<void> => {
  await LocationManager.requestAlwaysAuthorization();
};

export const authorizationChangedListener = (
  listener: (event: AuthorizationChangedEvent) => Promise<void> | void
): EmitterSubscription => {
  const emitterSubsctiption = LocationEventEmitter.addListener(
    'onAuthorizationStatusDidChange',
    listener
  );

  return emitterSubsctiption;
};

export const getCurrentLocation = async (): Promise<Location> => {
  return await LocationManager.getCurrentLocation();
};
