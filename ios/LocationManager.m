#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(LocationManager, RCTEventEmitter)
RCT_EXTERN_METHOD(locationServicesEnabled: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(requestWhenInUseAuthorization)
RCT_EXTERN_METHOD(requestAlwaysAuthorization)
@end
