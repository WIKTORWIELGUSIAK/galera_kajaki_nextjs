/** @format */
"use client";

import React, { useState } from "react";
import { Map as MapGL, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapSourceLayer from "@/MapSourceLayer/MapSourceLayer";
import type { MapSourceLayerProps } from "@/MapSourceLayerTypes";
import type { MapProps } from "@/MapTypes";
import {
  newRoadLayer,
  newRoadSourceProperties,
  selectedRiversLayer,
  selectedRiversSourceProperties,
} from "@/constants";
import { markerHandleDragEnd } from "./helpers/markerHandleDragEnd";
import { onLoad } from "./helpers/onLoad";
import type { MarkerProps } from "react-map-gl";

const Map = ({
  initialViewState,
  width,
  height,
  mapStyle,
  data,
  selectedRivers,
}: MapProps) => {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  return (
    <div className="h-full w-full">
      <MapGL
        // todo: Make sure that onLoad will work correctly when the selectedRivers source change
        onLoad={(e) => onLoad({ e, markers, setMarkers })}
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
                  selectedRivers,
                })
              }
            />
          ))}

        <MapSourceLayer
          sourceProperties={newRoadSourceProperties(markers)}
          layerProperties={newRoadLayer}
        />
        <MapSourceLayer
          sourceProperties={selectedRiversSourceProperties(selectedRivers)}
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
    </div>
  );
};

export default Map;
