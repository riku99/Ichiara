export type LocationAuthorizationStatus =
  | 'notDetermined'
  | 'denied'
  | 'restricted'
  | 'authorizedWhenInUse'
  | 'authorizedAlways';

export type AuthorizationChangedEvent = {
  status: LocationAuthorizationStatus;
};
