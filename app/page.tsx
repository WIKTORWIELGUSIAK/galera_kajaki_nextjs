/** @format */

// import useFetch from "@/hooks/useFetch";
import { getRoads } from "@/utils/getRoads";
import Map from "./components/Map/Map";

export default async function Home() {
  const data = await getRoads();
  return (
    <Map
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      initialViewState={{ lat: 50.049683, lng: 19.944544, zoom: 10 }}
      data={data}
    />
  );
}
