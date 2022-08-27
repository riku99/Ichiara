#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MapManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(onMapPress, RCTDirectEventBlock)
RCT_EXTERN_METHOD(searchLocation:(NSString *)text resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(searchCoodinate:(NSString *)query resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
