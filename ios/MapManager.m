#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MapManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(onMapPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(showUserLocationPoint, BOOL)
RCT_EXPORT_VIEW_PROPERTY(customRegion, NSDictionary)

RCT_EXTERN_METHOD(searchLocation:(nonnull NSNumber *)node text:(NSString *)text resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(searchCoodinate:(nonnull NSNumber *)node query:(NSString *)query resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(annotate:(nonnull NSNumber *)node coodinate:(NSDictionary *)coodinate)
RCT_EXTERN_METHOD(removeAllAnnotations:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(showCircle:(nonnull NSNumber *)node config:(NSDictionary *)config)
RCT_EXTERN_METHOD(removeCurrentCircle:(nonnull NSNumber *)node)
@end
