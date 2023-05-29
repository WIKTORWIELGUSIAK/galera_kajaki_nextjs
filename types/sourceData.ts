/** @format */

import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

export interface SourceData {
  sourceProperties: {
    data: FeatureCollection<Geometry, GeoJsonProperties>;
    id: string;
    type: string;
  };
  layerProperties: {
    type: string;
    source: string;
    paint: {
      "line-color": string;
      "line-width": number;
      "line-opacity": number;
    };
  };
}
