import Foundation
import UIKit
import MapKit
import CoreLocation

class MapView: MKMapView {  
  @objc var onMapPress: RCTBubblingEventBlock?
  
  override public init (frame: CGRect) {
    super.init(frame: frame)
    setupMap()
  }
  
  override func didSetProps(_ changedProps: [String]!) {
  }
  
  func setupMap() {
    self.showsUserLocation = true
    self.userTrackingMode = MKUserTrackingMode.followWithHeading
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(mapTapped(_:)))
    self.addGestureRecognizer(tapGesture)
  }
  
  @objc func mapTapped(_ sender: UITapGestureRecognizer) {
    if sender.state == .ended {
      let tapPoint = sender.location(in: self)
      let coordinate = self.convert(tapPoint, toCoordinateFrom: self)
      let annotation = MKPointAnnotation()
      annotation.coordinate = coordinate
      self.addAnnotation(annotation)
      
      let location = CLLocation(latitude: coordinate.latitude, longitude: coordinate.longitude)
      CLGeocoder().reverseGeocodeLocation(location, completionHandler: { placemarks, error in
        let placemark = placemarks?.first
        
        if let onPress = self.onMapPress {
          if let p = placemark {
            let address = "\(p.administrativeArea ?? "")\(p.locality ?? "")\(p.thoroughfare ?? "")\(p.subThoroughfare ?? "")"
            onPress(["latitude": coordinate.latitude, "longitude": coordinate.longitude, "address": address])
          } else {
            onPress(["latitude": coordinate.latitude, "longitude": coordinate.longitude,])
          }
        }
      })
    }
  }
  
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented.")
  }
}

enum MapPressEvent {
  case Location(CLLocationDegrees)
  case Placemark(CLPlacemark)
}
