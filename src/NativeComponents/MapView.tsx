import { requireNativeComponent, ViewProps } from 'react-native';

type Props = ViewProps;

export const MapView = (props: Props) => {
  return <NativeMap {...props} />;
};

const NativeMap = requireNativeComponent<Props>('Map');
