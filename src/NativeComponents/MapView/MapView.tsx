import { requireNativeComponent } from 'react-native';
import { MapViewProps } from './types';

export const MapView = (props: MapViewProps) => {
  return <NativeMap {...props} />;
};

const NativeMap = requireNativeComponent<MapViewProps>('Map');
