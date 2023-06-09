import type { Feature, GeoJsonProperties, LineString } from "geojson";

export function combineMultipleRiversIntoOne(coordinates: number[][][]) {
  const features: Feature<LineString, GeoJsonProperties>[] = [];
  coordinates.map((coordinatesArray: number[][]) => {
    const feature = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coordinatesArray,
      },
      properties: {
        title: "Road",
        "marker-symbol": "monument",
      },
    };
    features.push(feature as Feature<LineString, GeoJsonProperties>);
  });
  return features;
}
