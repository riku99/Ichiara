import { requireNativeComponent, ViewProps } from 'react-native';

type MapPressEvent = {
  latitude: number;
  longitude: number;
};

type Props = ViewProps & {
  onMapPress?: (event: MapPressEvent) => void;
};

export const MapView = (props: Props) => {
  return <NativeMap {...props} />;
};

const NativeMap = requireNativeComponent<Props>('Map');
