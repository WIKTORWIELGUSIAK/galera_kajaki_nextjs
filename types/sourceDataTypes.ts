import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

export type SourceData = {
  sourceProperties: {
    data: FeatureCollection<Geometry, GeoJsonProperties>;
    id: string;
    type: "geojson";
  };
  layerProperties: {
    type: "line";
    source: string;
    paint: {
      "line-color": string;
      "line-width": number;
      "line-opacity": number;
    };
  };
};
