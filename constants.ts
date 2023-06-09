import type { Feature } from "geojson";
import type { LayerProps, SourceProps } from "react-map-gl";

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

export const sourceProperties = (
  features: Feature[],
  id: string
): SourceProps => ({
  data: {
    type: "FeatureCollection",
    features,
  },
  id,
  type: "geojson",
});
