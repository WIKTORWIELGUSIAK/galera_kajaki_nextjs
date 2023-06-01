/** @format */

import type { Feature } from "geojson";
import type { LayerProps, MarkerProps, SourceProps } from "react-map-gl";

const Layer: LayerProps = {
  type: "line",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": "black",
    "line-width": 6,
    "line-opacity": 1,
  },
};
export const selectedRiversLayer: LayerProps = {
  ...Layer,
  id: "selectedRivers",
  paint: {
    ...Layer.paint,
    "line-color": "blue",
    "line-width": 6,
  },
};
export const newRoadLayer = {
  ...Layer,
  id: "newRoad",
  paint: {
    ...Layer.paint,
    "line-color": "red",
    "line-width": 6,
  },
};

export const selectedRiversSourceProperties = (
  features: Feature[]
): SourceProps => ({
  data: {
    type: "FeatureCollection",
    features: features,
  },
  id: "selectedRivers",
  type: "geojson",
});
export const testRiversSource = (features: Feature[]): SourceProps => ({
  data: {
    type: "FeatureCollection",
    features: features,
  },
  type: "geojson",
});

export const newRoadSourceProperties = (
  markers: MarkerProps[]
): SourceProps => ({
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates:
            markers.length > 1
              ? [
                  [markers[0].longitude, markers[0].latitude],
                  [markers[1].longitude, markers[1].latitude],
                ]
              : [],
        },
        properties: {
          title: "Road",
        },
      },
    ],
  },
  id: "newRoad",
  type: "geojson",
});
