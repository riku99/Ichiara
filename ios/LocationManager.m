#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocationManager, NSObject)
RCT_EXTERN_METHOD(locationServicesEnabled: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(requestWhenInUseAuthorization)
RCT_EXTERN_METHOD(requestAlwaysAuthorization)
@end
