import Foundation
import CoreLocation
import UIKit

@objc(LocationManager)
class LocationManager: NSObject {
  var locationManager = CLLocationManager()
  
  override init() {
    super.init()
    locationManager.delegate = self
    locationManager.desiredAccuracy = kCLLocationAccuracyBest
  }
  
  @objc
  func locationServicesEnabled(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let isEnabled = CLLocationManager.locationServicesEnabled()
    resolve(isEnabled)
  }
  
  @objc
  func requestWhenInUseAuthorization() {
    locationManager.requestWhenInUseAuthorization()
  }
  
  @objc
  func requestAlwaysAuthorization() {
    locationManager.requestAlwaysAuthorization()
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

extension LocationManager: CLLocationManagerDelegate {
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    
  }
}

