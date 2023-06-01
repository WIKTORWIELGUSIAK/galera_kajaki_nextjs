/** @format */

import type { LayerHandleClick } from "@/MapTypes";

export const layerHandleClick = ({
  lngLat,
  markers,
  setMarkers,
}: LayerHandleClick): void => {
  if (markers.length < 2) {
    const marker = {
      latitude: lngLat.lat,
      longitude: lngLat.lng,
      draggable: true,
    };
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  }
};
