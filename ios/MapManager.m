#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MapManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(onMapPress, RCTDirectEventBlock)
@end
