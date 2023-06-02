/** @format */
"use client";

import { useState } from "react";
import { Map as MapGL, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapSourceLayer from "@/MapSourceLayer/MapSourceLayer";
import type { MapSourceLayerProps } from "@/MapSourceLayerTypes";
import type { MapProps } from "@/MapTypes";
import {
  newRoadLayer,
  selectedRiversLayer,
  sourceProperties,
} from "@/constants";
import { createLineFeature } from "@/createLineFeature";
import usePathFinder from "@/hooks/usePathFinder/usePathFinder";
import { markerHandleDragEnd } from "./helpers/markerHandleDragEnd";
import { onLoad } from "./helpers/onLoad";
import type { MarkerProps } from "react-map-gl";

const Map = ({
  initialViewState,
  width,
  height,
  mapStyle,
  data,
  features,
}: MapProps) => {
  console.log("Map");
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  const newRoadCoordinates = usePathFinder(features, markers);
  const newRoadFeatures = createLineFeature(newRoadCoordinates);
  return (
    <MapGL
      // todo: Make sure that onLoad will work correctly when the selectedRivers source change
      onLoad={(e) => onLoad({ e, markers, setMarkers, features })}
      initialViewState={initialViewState}
      style={{ width, height }}
      mapStyle={mapStyle}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            {...marker}
            onDragEnd={(e) =>
              markerHandleDragEnd({
                markerIndex: index,
                lngLat: e.lngLat,
                markers,
                setMarkers,
                features,
              })
            }
          />
        ))}
      <MapSourceLayer
        sourceProperties={sourceProperties(newRoadFeatures, "newRoad")}
        layerProperties={newRoadLayer}
      />
      <MapSourceLayer
        sourceProperties={sourceProperties(features, "selectedRivers")}
        layerProperties={selectedRiversLayer}
      />

      {data.map((road: MapSourceLayerProps) => (
        <MapSourceLayer
          key={road.sourceProperties.id}
          sourceProperties={road.sourceProperties}
          layerProperties={road.layerProperties}
        />
      ))}
    </MapGL>
  );
};

export default Map;
