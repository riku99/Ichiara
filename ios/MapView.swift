import Foundation
import UIKit
import MapKit

class MapView: MKMapView {
  override public init (frame: CGRect) {
    super.init(frame: frame)
  }
  
  override func didSetProps(_ changedProps: [String]!) {
    setupMap()
  }
  
  func setupMap() {
//    mapView.showsUserLocation = true
//    mapView.userTrackingMode = MKUserTrackingMode.followWithHeading
    self.backgroundColor = .blue
  }
  
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented.")
  }
}
