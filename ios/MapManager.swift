import Foundation
import UIKit

@objc(MapManager)
class MapManager: RCTViewManager {
  
  override func view() -> UIView! {
    return MapView()
  }
  
  override var methodQueue: DispatchQueue! {
    return DispatchQueue.main
  }
  
  @objc
  func searchLocation(_ node: NSNumber, text: String!, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let component = getMapView(tag: node)
    component.searchLocation(text, resolve: resolve, rejecter: reject)
  }
  
  @objc
  func searchCoodinate(_ node: NSNumber, query: String!, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let component = getMapView(tag: node)
    component.searchCoodinate(query, resolve: resolve, rejecter: reject)
  }
  
  @objc
  func annotate(_ node: NSNumber, coodinate: [String: Double]) {
    let component = self.getMapView(tag: node)
    component.annotate(coodinate)
  }
  
  @objc
  func removeAllAnnotations(_ node: NSNumber) {
    let component = self.getMapView(tag: node)
    component.removeAllAnnotations()
  }
  
  @objc
  func showCircle(_ node: NSNumber, config: [String: Double]) {
    let component = getMapView(tag: node)
    component.showCircle(config)
  }
  
  @objc
  func removeCurrentCircle(_ node: NSNumber) {
    let component = getMapView(tag: node)
    component.removeCurrentCircle()
  }
  
  func getMapView(tag: NSNumber) -> MapView {
    return self.bridge.uiManager.view(forReactTag: tag) as! MapView
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
