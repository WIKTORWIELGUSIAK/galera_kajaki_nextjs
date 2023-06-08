/** @format */

import PathFinder from "geojson-path-finder";
import { useState, useEffect, useMemo } from "react";
import { createPointFeature } from "@/createPointFeature";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  LineString,
  Position,
} from "geojson";
import type { MarkerProps } from "react-map-gl";

const usePathFinder = (
  features: Feature<LineString, GeoJsonProperties>[],
  points: MarkerProps[]
) => {
  const [pathFinder, setPathFinder] =
    useState<PathFinder<LineString, GeoJsonProperties>>();
  const [newRoadCoords, setNewRoadCoords] = useState<Position[]>([]);

  useEffect(() => {
    const geoJSONObject: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features,
    };
    const newPathFinder: PathFinder<LineString, GeoJsonProperties> =
      new PathFinder(geoJSONObject);
    setPathFinder(newPathFinder);
  }, [features]);

  useEffect(() => {
    if (pathFinder && points[0] && points[1]) {
      const startPoint = createPointFeature(points[0]);
      const endPoint = createPointFeature(points[1]);
      const path = pathFinder.findPath(startPoint, endPoint);
      if (path) {
        setNewRoadCoords(path.path);
      } else {
        setNewRoadCoords([]);
      }
    }
  }, [points, pathFinder, features]);

  return useMemo(() => newRoadCoords, [newRoadCoords]);
};

export default usePathFinder;
