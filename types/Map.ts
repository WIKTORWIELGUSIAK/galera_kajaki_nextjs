/** @format */

import { Road } from "./Road";

type InitialViewState = {
  lat: number;
  lng: number;
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
  data: Road[];
};
