import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {
  AuthorizationChangedEvent,
  Location,
  LocationUpdateEvent,
} from './types';

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
  const emitterSubscription = LocationEventEmitter.addListener(
    'onAuthorizationStatusDidChange',
    listener
  );

  return emitterSubscription;
};

export const getCurrentLocation = async (): Promise<Location> => {
  return await LocationManager.getCurrentLocation();
};

export const locationUpdateListener = (
  listener: (event: LocationUpdateEvent) => Promise<void> | void
): EmitterSubscription => {
  const emitterSubscription = LocationEventEmitter.addListener(
    'onLocationDidUpdate',
    listener
  );

  return emitterSubscription;
};
