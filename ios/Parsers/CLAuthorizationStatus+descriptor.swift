//
//  CLAuthorizationStatus+descriptor.swift
//  Ichiara
//
//  Created by 黒澤陸 on 2022/12/24.
//

import CoreLocation

extension CLAuthorizationStatus {
  var descriptor: String {
    switch self {
    case .authorizedAlways:
      return "authorizedAlways"
    case .authorizedWhenInUse:
      return "authorizedWhenInUse"
    case .denied:
      return "denied"
    case .notDetermined:
      return "notDetermined"
    case .restricted:
      return "restricted"
    @unknown default:
      fatalError("CLAuthorizationStatus has unknown state.")
    }
  }
}
