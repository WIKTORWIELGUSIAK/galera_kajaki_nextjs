import React from "react";
import { Source } from "react-map-gl";
import type { MapSourceType } from "@/MapSourceTypes";

export default function MapSource({ id, features, children }: MapSourceType) {
  return (
    <Source
      id={id}
      type="geojson"
      data={{ type: "FeatureCollection", features }}
    >
      {children}
    </Source>
  );
}
