import Foundation
import UIKit
import MapKit
import CoreLocation

class MapView: MKMapView {
  var locationManager: CLLocationManager!
  
  override public init (frame: CGRect) {
    super.init(frame: frame)
    setupMap()
    setupLocation()
  }
  
  override func didSetProps(_ changedProps: [String]!) {
  }
  
  func setupLocation() {
    locationManager = CLLocationManager()
    locationManager.delegate = self
    locationManager.desiredAccuracy = kCLLocationAccuracyBest
    if CLLocationManager.locationServicesEnabled() {
      locationManager.requestWhenInUseAuthorization()
//      locationManager.startUpdatingLocation()
    }
  }
  
  func setupMap() {
    self.showsUserLocation = true
    self.userTrackingMode = MKUserTrackingMode.followWithHeading
  }
  
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented.")
  }
}

extension MapView: CLLocationManagerDelegate {
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    
  }
}
