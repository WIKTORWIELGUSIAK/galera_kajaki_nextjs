import type { AddMarkerOnLayerClickArgs } from "@/MapTypes";
import { findClosestCoords } from "./findClosestCords";

export const addMarkerOnLayerClick = ({
  lngLat,
  markers,
  addMarker,
  features,
}: AddMarkerOnLayerClickArgs): void => {
  const closestCoords = findClosestCoords(
    features.flatMap((feature) => feature.geometry.coordinates),
    [lngLat.lng, lngLat.lat]
  );

  if (markers.length < 2 && addMarker) {
    const marker = {
      latitude: closestCoords[1],
      longitude: closestCoords[0],
      draggable: true,
    };
    addMarker(marker);
  }
};
