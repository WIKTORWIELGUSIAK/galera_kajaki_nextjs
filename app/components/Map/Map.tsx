/** @format */
"use client";

import React, { useState } from "react";
import {
  Layer,
  Map as MapGL,
  Marker,
  MarkerDragEvent,
  MarkerProps,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProps } from "@/types/Map";
import createSourcesData from "@/utils/createSourcesData";
const Map = ({ initialViewState, width, height, mapStyle, data }: MapProps) => {
  const { lat, lng, zoom } = initialViewState;
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const roadsData = createSourcesData(data);
  const handleDragEnd = (markerIndex: number, e: MarkerDragEvent) => {
    const { lngLat } = e;
    const updatedMarkers = markers.map((marker, index) =>
      index === markerIndex
        ? { ...marker, latitude: lngLat.lat, longitude: lngLat.lng }
        : marker
    );
    setMarkers(updatedMarkers);
  };
  const handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (markers.length < 2) {
      const marker = {
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
        draggable: true,
      };
      setMarkers([...markers, marker]);
    }
  };

  return (
    <div className="w-full h-full">
      <MapGL
        onClick={handleClick}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        style={{ width, height }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {markers.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              {...marker}
              onDragEnd={(e) => handleDragEnd(index, e)}
            />
          ))}
        {roadsData.map((road: any) => (
          <Source key={road.sourceProperties.id} {...road.sourceProperties}>
            <Layer {...road.layerProperties} />
          </Source>
        ))}
      </MapGL>
    </div>
  );
};

export default Map;
