/** @format */

import type { AddMarkerOnLayerClickArgs } from "@/MapTypes";
import { findClosestCoords } from "./findClosestCords";

export const addMarkerOnLayerClick = ({
  lngLat,
  markers,
  setMarkers,
  features,
}: AddMarkerOnLayerClickArgs): void => {
  const closestCoords = findClosestCoords(
    features.flatMap((feature) => feature.geometry.coordinates),
    [lngLat.lng, lngLat.lat]
  );
  if (markers.length < 2) {
    const marker = {
      latitude: closestCoords[1],
      longitude: closestCoords[0],
      draggable: true,
    };
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  }
};
