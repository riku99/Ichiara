import Foundation
import UIKit

@objc(MapManager)
class MapManager: RCTViewManager {
  override func view() -> UIView! {
    return MapView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
