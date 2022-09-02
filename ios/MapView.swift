import Foundation
import UIKit
import MapKit
import CoreLocation

class MapView: MKMapView, MKLocalSearchCompleterDelegate, MKMapViewDelegate {
  
  @objc var onMapPress: RCTBubblingEventBlock?
  @objc var showUserLocationPoint = false
  @objc var customRegion: NSDictionary?
  
  var searchCompleter = MKLocalSearchCompleter()
  var searchLocationResolver: RCTPromiseResolveBlock?
  var searchLocationRjecter: RCTPromiseRejectBlock?
  
  var mapCircle: MKCircle?
  
  override public init (frame: CGRect) {
    super.init(frame: frame)
    setupMap()
  }
  
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented.")
  }
  
  override func didSetProps(_ changedProps: [String]!) {
    let shouldReconfigureUserLocationVisible = changedProps.contains("showUserLocationPoint")
    let shouldReconfigureCustomRegion = changedProps.contains("customRegion")
    
    if shouldReconfigureUserLocationVisible {
      configureUserLocationVisible()
    }
    if shouldReconfigureCustomRegion {
      configureCustomRegion()
    }
  }
  
  func setupMap() {
    self.delegate = self
    searchCompleter.delegate = self
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(mapTapped(_:)))
    self.addGestureRecognizer(tapGesture)
  }
  
  func configureCustomRegion() {
    if customRegion == nil {
      return
    }
    
    if let lat = customRegion!["latitude"], let lng = customRegion!["longitude"] {
      let loc = CLLocationCoordinate2DMake(CLLocationDegrees(lat as! Double), CLLocationDegrees(lng as! Double))
      var region = self.region
      if let latDelta = customRegion!["latitudeDelta"], let lngDelta = customRegion!["longitudeDelta"] {
        region.span.latitudeDelta = latDelta as! Double
        region.span.longitudeDelta = lngDelta as! Double
      }
      region.center = loc
      self.setRegion(region, animated: true)
    }
  }
  
  func configureUserLocationVisible() {
    self.showsUserLocation = showUserLocationPoint
  }
  
  @objc func mapTapped(_ sender: UITapGestureRecognizer) {
    if sender.state == .ended {
      let tapPoint = sender.location(in: self)
      let coordinate = self.convert(tapPoint, toCoordinateFrom: self)

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
  
  func removeAllAnnotations() {
    // annotateとこのメソッドの組み合わせの問題で、明示的にメインスレッド使わないとエラー出る
    DispatchQueue.main.async {
      self.removeAnnotations(self.annotations)
    }
  }
  
  func annotate(_ coodinate: [String: Double]) {
    DispatchQueue.main.async {
      if let lat = coodinate["lat"], let lng = coodinate["lng"] {
        let coodinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
        let annotation = MKPointAnnotation()
        annotation.coordinate = coodinate
        self.addAnnotation(annotation)
      }
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
  
  func searchCoodinate(_ query: String!, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let searchRequest = MKLocalSearch.Request()
    searchRequest.naturalLanguageQuery = query
    let search = MKLocalSearch(request: searchRequest)
    search.start(completionHandler: {(response, error) in
      guard let response = response else {
        reject("notCoodinateFound", "位置情報が見つかりませんでした。", nil)
        return
      }
      
      let coodinate = response.mapItems[0].placemark.coordinate
      let data = ["latitude": coodinate.latitude, "longitude": coodinate.longitude]
      resolve(data)
    })
  }
  
  func showCircle(_ config: [String: Double]) {
    DispatchQueue.main.async {
      if let lat = config["lat"], let lng = config["lng"], let r = config["radius"] {
        let coodinate = CLLocationCoordinate2DMake(lat, lng)
        let radius = CLLocationDistance(r)
        self.mapCircle = MKCircle(center: coodinate, radius: radius)
        if let circle = self.mapCircle {
          self.addOverlay(circle)
        }
      }
    }
  }
  
  func removeCurrentCircle() {
    if let circle = self.mapCircle {
      self.removeOverlay(circle)
    }
  }
  
  func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
    let circle = MKCircleRenderer(overlay: overlay)
    circle.strokeColor = .blue
    circle.fillColor = UIColor(red: 0, green: 0, blue: 0.5, alpha: 0.1)
    circle.lineWidth = 1.0
    return circle
  }
}

extension MapView {
  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    let results = completer.results.compactMap { (result) -> [String: String] in
      return ["title": result.title, "subtitle": result.subtitle]
    }
    
    self.searchLocationResolver?(results)
  }
}
