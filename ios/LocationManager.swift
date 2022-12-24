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
    locationManager.distanceFilter = 5
    locationManager.allowsBackgroundLocationUpdates = true
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
  func getCurrentLocation(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let coodinate = locationManager.location?.coordinate
    if coodinate != nil {
      let data = ["latitude": coodinate!.latitude, "longitude": coodinate!.longitude]
      resolve(data)
    } else {
      reject("noLocation", "位置情報を取得できませんでした。", nil)
    }
  }
  
  @objc
  func getAuthorizationStatus(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    if #available(iOS 14.0, *) {
      let status = locationManager.authorizationStatus
      resolve(locationManager.authorizationStatus.descriptor)
    } else {
      resolve(CLLocationManager.authorizationStatus().descriptor)
    }
  }
  
  @objc
  override func supportedEvents() -> [String]! {
    return ["onAuthorizationStatusDidChange", "onLocationDidUpdate"]
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
}

extension LocationManager: CLLocationManagerDelegate {
  func sendLocationUpdateEvent(_ location: [String: Double]) {
    return sendEvent(withName: "onLocationDidUpdate", body: location)
  }

  
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let newLocation = locations.last {
      sendLocationUpdateEvent([
        "latitude": newLocation.coordinate.latitude,
        "longitude": newLocation.coordinate.longitude
      ])
    }
    
  }
  
  func sendAuthorizationChangedEvent(_ status: String!) {
    return sendEvent(withName: "onAuthorizationStatusDidChange", body: ["status": status])
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
      sendAuthorizationChangedEvent("notDetermined")
      break
    case .denied:
      sendAuthorizationChangedEvent("denied")
      break
    case .restricted:
      sendAuthorizationChangedEvent("restricted")
      break
    case .authorizedWhenInUse:
      sendAuthorizationChangedEvent("authorizedWhenInUse")
      locationManager.startUpdatingLocation()
      break
    case .authorizedAlways:
      sendAuthorizationChangedEvent("authorizedAlways")
      locationManager.startUpdatingLocation()
      break
    default:
      break
    }
  }
}

