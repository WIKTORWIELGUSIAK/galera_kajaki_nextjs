/** @format */
"use client";

import { useEffect, useRef, useState } from "react";
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
import { addMarkerOnLayerClick } from "./helpers/addMarkerOnLayerClick";
import { markerHandleDragEnd } from "./helpers/markerHandleDragEnd";
import { onLoad } from "./helpers/onLoad";
import type { MarkerProps, MapRef, MapLayerMouseEvent } from "react-map-gl";

const Map = ({
  initialViewState,
  width,
  height,
  mapStyle,
  data,
  features,
}: MapProps) => {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const newRoadCoordinates = usePathFinder(features, markers);
  const newRoadFeatures = createLineFeature(newRoadCoordinates);

  const mapRef = useRef<MapRef>(null);
  useEffect(() => {
    const handleLayerClick = ({ lngLat }: MapLayerMouseEvent) => {
      addMarkerOnLayerClick({
        lngLat,
        markers,
        setMarkers,
        features,
      });
    };

    const map = mapRef.current;

    map?.on("click", "selectedRivers", handleLayerClick);

    return () => {
      map?.off("click", "selectedRivers", handleLayerClick);
    };
  }, [features, markers]);

  return (
    <MapGL
      onLoad={(e) => onLoad(e)}
      ref={mapRef}
      initialViewState={initialViewState}
      style={{ width, height }}
      mapStyle={mapStyle}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onMouseEnter={(e) => e}
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
      <MapSourceLayer
        sourceProperties={sourceProperties(newRoadFeatures, "newRoad")}
        layerProperties={newRoadLayer}
      />
    </MapGL>
  );
};

export default Map;
