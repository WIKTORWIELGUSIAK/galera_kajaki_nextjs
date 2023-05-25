/** @format */

import Map from "./components/Map/Map";

export default function Home() {
  return (
    <Map
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      initialViewState={{ lat: 50.049683, lng: 19.944544, zoom: 10 }}
    />
  );
}
