import { NativeModules } from 'react-native';

type LocationManager = {
  locationServicesEnabled: () => Promise<boolean>;
  requestWhenInUseAuthorization: () => Promise<void>;
  requestAlwaysAuthorization: () => Promise<void>;
};

const { LocationManager } = NativeModules;

export default LocationManager as LocationManager;
