import Foundation
import CoreLocation
import UIKit

@objc(LocationManager)
class LocationManager: NSObject {
  var locationManager = CLLocationManager()
  
  @objc
  func requestWhenInUseAuthorization(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    locationManager.delegate = self
    locationManager.desiredAccuracy = kCLLocationAccuracyBest
    if CLLocationManager.locationServicesEnabled() {
      locationManager.requestWhenInUseAuthorization()
    } else {
      reject("locationServicesNotEnabled", "端末の位置情報サービスが許可されていません", nil)
    }
  }
  
//  @objc
//  func requestAlwaysAuthorization() {
//    locationManager.delegate = self
//    locationManager.desiredAccuracy = kCLLocationAccuracyBest
//    if CLLocationManager.locationServicesEnabled() {
//      locationManager.requestAlwaysAuthorization()
//    }
//  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

extension LocationManager: CLLocationManagerDelegate {
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    
  }
}

