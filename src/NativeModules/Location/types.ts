export type LocationAuthorizationStatus =
  | 'notDetermined'
  | 'denied'
  | 'restricted'
  | 'authorizedWhenInUse'
  | 'authorizedAlways';

export type AuthorizationChangedEvent = {
  status: LocationAuthorizationStatus;
};

export type Location = {
  latitude: number;
  longitude: number;
};
