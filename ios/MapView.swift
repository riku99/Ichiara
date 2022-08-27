import Foundation
import UIKit
import MapKit
import CoreLocation

class MapView: MKMapView, MKLocalSearchCompleterDelegate, MKMapViewDelegate {
  
  @objc var onMapPress: RCTBubblingEventBlock?
  
  var searchCompleter = MKLocalSearchCompleter()
  var searchLocationResolver: RCTPromiseResolveBlock?
  var searchLocationRjecter: RCTPromiseRejectBlock?
  
  override public init (frame: CGRect) {
    super.init(frame: frame)
    setupMap()
  }
  
  func setupMap() {
    self.delegate = self
    searchCompleter.delegate = self
    self.showsUserLocation = true
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(mapTapped(_:)))
    self.addGestureRecognizer(tapGesture)
  }
  
  @objc func mapTapped(_ sender: UITapGestureRecognizer) {
    if sender.state == .ended {
      let tapPoint = sender.location(in: self)
      let coordinate = self.convert(tapPoint, toCoordinateFrom: self)
      let annotation = MKPointAnnotation()
      annotation.coordinate = coordinate
      // 表示されているアノテーションを1つにする
      self.removeAnnotations(self.annotations)
      self.addAnnotation(annotation)

      let location = CLLocation(latitude: coordinate.latitude, longitude: coordinate.longitude)
      CLGeocoder().reverseGeocodeLocation(location, completionHandler: { placemarks, error in
        let placemark = placemarks?.first

        var eventData: [String: Any] = ["latitude": coordinate.latitude, "longitude": coordinate.longitude]

        if let onPress = self.onMapPress {
          if let p = placemark {
            let address = "\(p.administrativeArea ?? "")\(p.locality ?? "")\(p.thoroughfare ?? "")\(p.subThoroughfare ?? "")"
            eventData["address"] = address
          }
          onPress(eventData)
        }
      })
    }
  }
  
  func searchLocation(_ text: String!, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    // メインスレッドで実行しないとcompleterDidUpdateResultsが実行されない(?)
    DispatchQueue.main.async {
      self.searchCompleter.queryFragment = text
      self.searchLocationResolver = resolve
      self.searchLocationRjecter = reject
    }
  }
  
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented.")
  }
}

extension MapView {
  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    let results = completer.results.compactMap { (result) -> [String: String] in
      return ["title": result.title, "subtitle": result.subtitle]
    }
    self.searchLocationResolver?(results)
  }
  
  func mapViewDidFinishLoadingMap(_ mapView: MKMapView) {
    mapView.userTrackingMode = .followWithHeading
  }
}
