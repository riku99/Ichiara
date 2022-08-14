import Foundation
import UIKit
import MapKit

class MapView: MKMapView {
  var locationManager: CLLocationManager!
  
  override public init (frame: CGRect) {
    super.init(frame: frame)
    setupMap()
  }
  
  override func didSetProps(_ changedProps: [String]!) {
  }
  
  func setupMap() {
    self.showsUserLocation = true
    self.userTrackingMode = MKUserTrackingMode.followWithHeading
  }
  
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented.")
  }
}
