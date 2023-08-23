import type { SourceData } from "./sourceDataTypes";
import type { Feature, GeoJsonProperties, LineString } from "geojson";
import type { MapboxEvent } from "mapbox-gl";
import type { Dispatch } from "react";
import type { LngLat, MapLayerMouseEvent, MarkerProps } from "react-map-gl";

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
  sourceData: SourceData[];
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

export type OnLoadArgs = {
  e: MapboxEvent<undefined>;
  handleLayerClick: ({ lngLat }: MapLayerMouseEvent) => void;
};
