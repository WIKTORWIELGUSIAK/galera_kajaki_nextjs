import type { MarkerHandleDragEnd } from "@/MapTypes";
import { findClosestCoords } from "./findClosestCords";

export const markerHandleDragEnd = ({
  markerIndex,
  lngLat,
  markers,
  setMarkers,
  features,
}: MarkerHandleDragEnd): void => {
  const updatedMarkers = markers.map((marker, index) => {
    if (index === markerIndex) {
      const closestCoords = findClosestCoords(
        features.flatMap((feature) => feature.geometry.coordinates),
        [lngLat.lng, lngLat.lat]
      );
      const [longitude, latitude] = closestCoords;
      return { ...marker, latitude, longitude };
    }
    return marker;
  });

  setMarkers(updatedMarkers);
};
