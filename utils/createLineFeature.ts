import type { Feature, GeoJsonProperties, Geometry, Position } from "geojson";

export const createLineFeature = (coordinates: Position[] | null) => {
  const lineFeature: Feature<Geometry, GeoJsonProperties>[] = [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coordinates || [],
      },
      properties: {},
    },
  ];

  return lineFeature;
};
