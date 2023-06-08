/** @format */

// import type { River } from "@/search_river";
import type { SourceData } from "./sourceDataTypes";
import type { Feature, GeoJsonProperties, LineString } from "geojson";
import type { Dispatch } from "react";
import type { LngLat, MapboxEvent, MarkerProps } from "react-map-gl";

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
  width: string;
  height: string;
  mapStyle: MapStyle;
  data: SourceData[];
  features: Feature<LineString, GeoJsonProperties>[];
};

type MarkersState = {
  markers: MarkerProps[];
  setMarkers: Dispatch<React.SetStateAction<MarkerProps[]>>;
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

export type OnLoad = {
  e: MapboxEvent<undefined>;
};
