import { ViewProps } from 'react-native';

type LatLng = {
  latitude: number;
  longitude: number;
};

export type MapPressEvent = {
  nativeEvent: LatLng & {
    address?: string
  }
};

export type MapViewProps = ViewProps & {
  onMapPress?: ({ nativeEvent }: MapPressEvent) => void;
};
