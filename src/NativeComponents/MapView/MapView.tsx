import React from 'react';
import {
  findNodeHandle,
  NativeMethods,
  NativeModules,
  requireNativeComponent,
} from 'react-native';
import {
  MapViewProps,
  SearchCoodinateResult,
  SearchLocationResult,
} from './types';

const NativeMap = requireNativeComponent<MapViewProps>('Map');
const MapModule = NativeModules.MapManager;

type RefType = React.Component<MapViewProps> & Readonly<NativeMethods>;

export class MapView extends React.Component<MapViewProps> {
  private readonly ref: React.RefObject<RefType>;

  constructor(props: MapViewProps) {
    super(props);
    this.ref = React.createRef<RefType>();
  }

  private get handle(): number | null {
    const nodeHandle = findNodeHandle(this.ref.current);
    if (nodeHandle == null || nodeHandle === -1) {
      throw new Error('コンポーネントが見つかりません。');
    }

    return nodeHandle;
  }

  async searchLocation(text: string): Promise<SearchLocationResult> {
    const results = await MapModule.searchLocation(this.handle, text);
    return results;
  }

  async searchCoodinate(query: string): Promise<SearchCoodinateResult> {
    const result = await MapModule.searchCoodinate(this.handle, query);
    return result;
  }

  async annotate(coodinate: { lat: number; lng: number }): Promise<void> {
    await MapModule.annotate(this.handle, coodinate);
  }

  async removeAllAnnotations(): Promise<void> {
    await MapModule.removeAllAnnotations(this.handle);
  }

  async showCircle(config: {
    lat: number;
    lng: number;
    radius: number;
  }): Promise<void> {
    await MapModule.showCircle(this.handle, config);
  }

  async removeCurrentCircle(): Promise<void> {
    await MapModule.removeCurrentCircle(this.handle);
  }

  render() {
    return <NativeMap {...this.props} ref={this.ref} />;
  }
}
