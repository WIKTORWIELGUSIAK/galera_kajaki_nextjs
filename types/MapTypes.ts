import type { RoadType } from "./RoadType";
import type { Feature, GeoJsonProperties, LineString } from "geojson";
import type { MapboxEvent } from "mapbox-gl";
import type { Dispatch, SetStateAction } from "react";
import type { LngLat, MarkerProps } from "react-map-gl";

type InitialViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type MapStyle =
  | `mapbox://styles/mapbox/streets-v12`
  | `mapbox://styles/mapbox/outdoors-v12`
  | `mapbox://styles/mapbox/light-v11`
  | `mapbox://styles/mapbox/dark-v11`
  | `mapbox://styles/mapbox/satellite-v9`
  | `mapbox://styles/mapbox/satellite-streets-v12`
  | "mapbox://styles/mapbox/navigation-day-v1"
  | "mapbox://styles/mapbox/navigation-night-v1";
export type MapProps = {
  initialViewState: InitialViewState;
  mapStyle: MapStyle;
  sourceData: RoadType[];
  features: Feature<LineString, GeoJsonProperties>[];
};

type MarkersState = {
  markers: MarkerProps[];
  setMarkers?: (newMarkerProps: MarkerProps[]) => void;
  addMarker?: (newMarkerProps: MarkerProps) => void;
};

export type MarkerHandleDragEnd = MarkersState & {
  markerIndex: number;
  lngLat: LngLat;
  features: Feature<LineString, GeoJsonProperties>[];
};

export type AddMarkerOnLayerClickArgs = MarkersState & {
  lngLat: LngLat;
  features: Feature<LineString, GeoJsonProperties>[];
};

export type OnLoadArgs = {
  e: MapboxEvent<undefined>;
  setMapLoaded: Dispatch<SetStateAction<boolean>>;
};
