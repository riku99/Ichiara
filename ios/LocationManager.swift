import Foundation
import CoreLocation

@objc(LocationManager)
class LocationManager: NSObject {
  var locationManager: CLLocationManager!
  
  @objc
  func requestWhenInUseAuthorization() {
    locationManager = CLLocationManager()
    locationManager.delegate = self
    locationManager.desiredAccuracy = kCLLocationAccuracyBest
    if CLLocationManager.locationServicesEnabled() {
      locationManager.requestWhenInUseAuthorization()
    }
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

extension LocationManager: CLLocationManagerDelegate {
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    
  }
}

