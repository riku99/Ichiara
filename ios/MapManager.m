#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MapManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(onMapPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(showUserLocationPoint, BOOL)
RCT_EXPORT_VIEW_PROPERTY(customRegion, NSDictionary)

RCT_EXTERN_METHOD(searchLocation:(NSString *)text resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(searchCoodinate:(NSString *)query resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(annotate:(NSDictionary *)coodinate)
RCT_EXTERN_METHOD(removeAllAnnotations)
RCT_EXTERN_METHOD(showCircle:(NSDictionary *)showCircle)
RCT_EXTERN_METHOD(removeCurrentCircle)
@end
