/** @format */

import { CombineMultipleRiversIntoOne } from "@/CombineMultipleRiversIntoOne";
import Map from "@/Map/Map";
import createSourcesData from "@/createSourcesData";
import { getRoads } from "@/getRoads";
import { getRiver } from "@/search_river";

export default async function Home() {
  const river = "Wisła";
  const data = await getRoads();
  const selectedRivers = await getRiver(river);
  return (
    <Map
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      initialViewState={{ latitude: 50.049683, longitude: 19.944544, zoom: 10 }}
      data={createSourcesData(data)}
      selectedRivers={CombineMultipleRiversIntoOne(selectedRivers.coordinates)}
    />
  );
}
