import { NativeModules } from 'react-native';

type LocationManager = {
  requestWhenInUseAuthorization: () => Promise<void>;
};

const { LocationManager } = NativeModules;

export default LocationManager as LocationManager;
