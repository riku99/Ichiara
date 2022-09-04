import Foundation
import UIKit

@objc(MapManager)
class MapManager: RCTViewManager {
  let mapView = MapView()
  
  override func view() -> UIView! {
    return mapView
  }
  
  @objc
  func searchLocation(_ text: String!, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    mapView.searchLocation(text, resolve: resolve, rejecter: reject)
  }
  
  @objc
  func searchCoodinate(_ query: String!, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    mapView.searchCoodinate(query, resolve: resolve, rejecter: reject)
  }
  
  @objc
  func annotate(_ coodinate: [String: Double]) {
    mapView.annotate(coodinate)
  }
  
  @objc
  func removeAllAnnotations() {
    mapView.removeAllAnnotations()
  }
  
  @objc
  func showCircle(_ config: [String: Double]) {
    mapView.showCircle(config)
  }
  
  @objc
  func removeCurrentCircle() {
    mapView.removeCurrentCircle()
  }
  
  func getMapView(tag: NSNumber) -> MapView {
    return bridge.uiManager.view(forReactTag: tag) as! MapView
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
