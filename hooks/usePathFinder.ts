import PathFinder from "geojson-path-finder";
import { useState, useEffect } from "react";
import { createPointFeature } from "@/createPointFeature";
import useStore from "@/store";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  LineString,
} from "geojson";
import type { MarkerProps } from "react-map-gl";

export default function usePathFinder(
  features: Feature<LineString, GeoJsonProperties>[],
  points: MarkerProps[]
) {
  const { setNewRoadCoordinates } = useStore();
  const [pathFinder, setPathFinder] =
    useState<PathFinder<LineString, GeoJsonProperties>>();

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
        setNewRoadCoordinates(path.path);
      } else {
        setNewRoadCoordinates([]);
      }
    }
  }, [points, pathFinder, features, setNewRoadCoordinates]);
}
