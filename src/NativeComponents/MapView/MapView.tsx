import React from 'react';
import {
  NativeMethods,
  NativeModules,
  requireNativeComponent,
} from 'react-native';
import { MapViewProps } from './types';

const NativeMap = requireNativeComponent<MapViewProps>('Map');
const MapModule = NativeModules.MapManager;

type RefType = React.Component<MapViewProps> & Readonly<NativeMethods>;

export class MapView extends React.Component<MapViewProps> {
  private readonly ref: React.RefObject<RefType>;

  constructor(props: MapViewProps) {
    super(props);
    this.ref = React.createRef<RefType>();
  }

  async searchLocation(text: string): Promise<string[]> {
    const results = await MapModule.searchLocation(text);
    console.log('😆 JS results is ');
    console.log(results);
    return results;
  }

  render() {
    return <NativeMap {...this.props} ref={this.ref} />;
  }
}
