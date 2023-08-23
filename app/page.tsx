import Map from "@/Map/Map";
import Sidebar from "@/Sidebar/Sidebar";
import { combineMultipleRiversIntoOne } from "@/combineMultipleRiversIntoOne";
import createSourcesData from "@/createSourcesData";

import fetchRivers from "./api/fetchRivers.GET";
import fetchRoads from "./api/fetchRoads.GET";

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string>;
}) {
  const roads = await fetchRoads();
  const rivers = await fetchRivers(searchParams);

  return (
    <div className="h-screen w-screen">
      <Map
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        initialViewState={{
          latitude: 50.049683,
          longitude: 19.944544,
          zoom: 10,
        }}
        sourceData={createSourcesData(roads)}
        features={combineMultipleRiversIntoOne(rivers.coordinates)}
      />
      <Sidebar roads={roads} />
    </div>
  );
}
