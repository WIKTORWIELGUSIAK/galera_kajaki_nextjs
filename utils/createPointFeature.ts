import type { Feature, GeoJsonProperties, Point } from "geojson";
import type { MarkerProps } from "react-map-gl";

export const createPointFeature = (point: MarkerProps) => {
  const coordinates = [point.longitude, point.latitude];

  const pointFeature: Feature<Point, GeoJsonProperties> = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
    properties: {},
  };

  return pointFeature;
};
