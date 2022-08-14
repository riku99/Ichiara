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
    self.showsUserLocation = true
    self.userTrackingMode = MKUserTrackingMode.followWithHeading
  }
  
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented.")
  }
}
