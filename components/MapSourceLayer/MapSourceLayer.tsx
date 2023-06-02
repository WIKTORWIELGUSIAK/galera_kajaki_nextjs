/** @format */

import React from "react";
import { Layer, Source } from "react-map-gl";
import type { MapSourceLayerProps } from "@/MapSourceLayerTypes";

const MapSourceLayer = ({
  sourceProperties,
  layerProperties,
}: MapSourceLayerProps) => (
  <Source {...sourceProperties}>
    <Layer {...layerProperties} />
  </Source>
);
export default MapSourceLayer;
