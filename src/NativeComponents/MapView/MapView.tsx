import React from 'react';
import {
  NativeMethods,
  NativeModules,
  requireNativeComponent,
} from 'react-native';
import { MapViewProps, SearchLocationResult } from './types';

const NativeMap = requireNativeComponent<MapViewProps>('Map');
const MapModule = NativeModules.MapManager;

type RefType = React.Component<MapViewProps> & Readonly<NativeMethods>;

export class MapView extends React.Component<MapViewProps> {
  private readonly ref: React.RefObject<RefType>;

  constructor(props: MapViewProps) {
    super(props);
    this.ref = React.createRef<RefType>();
  }

  async searchLocation(text: string): Promise<SearchLocationResult> {
    const results = await MapModule.searchLocation(text);
    return results;
  }

  async searchCoodinate(query: string): Promise<void> {
    const result = await MapModule.searchCoodinate(query);
  }

  render() {
    return <NativeMap {...this.props} ref={this.ref} />;
  }
}
