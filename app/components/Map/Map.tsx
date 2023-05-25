/** @format */
"use client";

import React from "react";
import { Map as MapGL } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProps } from "@/types/Map";
const Map = ({
  initialViewState,
  width,
  height,
  mapStyle,
  children,
}: MapProps) => {
  const { lat, lng, zoom } = initialViewState;
  return (
    <div className="w-full h-full">
      <MapGL
        onClick={(e) => console.log(e)}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        style={{ width, height }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {children}
      </MapGL>
    </div>
  );
};

export default Map;
