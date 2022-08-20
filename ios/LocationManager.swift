import Foundation
import CoreLocation
import UIKit

@objc(LocationManager)
class LocationManager: RCTEventEmitter {
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
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

extension LocationManager: CLLocationManagerDelegate {
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    
  }
  
  func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
    var status: CLAuthorizationStatus!
    if #available(iOS 14.0, *) {
      status = manager.authorizationStatus
    } else {
      status = CLLocationManager.authorizationStatus()
    }
    switch status {
    case .notDetermined:
      sendEvent(withName: "onAuthorizationStatusDidChange", body: ["status": "notDetermined"])
      break
    case .authorizedWhenInUse:
      sendEvent(withName: "onAuthorizationStatusDidChange", body: ["status": "authorizedWhenInUse"])
      break
    case .authorizedAlways:
      sendEvent(withName: "onAuthorizationStatusDidChange", body: ["status": "authorizedAlways"])
    default:
      break
    }
  }
}

