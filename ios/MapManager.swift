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
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
