import { ViewProps } from 'react-native';

type LatLng = {
  latitude: number;
  longitude: number;
};

type Delta = {
  latitudeDelta: number;
  longitudeDelta: number;
};

type Region = LatLng & Delta;

export type MapPressEvent = {
  nativeEvent: LatLng & {
    address?: string;
  };
};

export type MapViewProps = ViewProps & {
  onMapPress?: ({ nativeEvent }: MapPressEvent) => void;
  showUserLocationPoint?: boolean;
  customRegion?: Region;
};

export type SearchLocationResultData = {
  title?: string;
  subtitle?: string;
};

export type SearchLocationResult = SearchLocationResultData[];
