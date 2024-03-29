import { Suspense, lazy } from "react";
const Map = lazy(() => import("@/Map/Map"));
import Sidebar from "@/Sidebar/Sidebar";
import { combineMultipleRiversIntoOne } from "@/combineMultipleRiversIntoOne";
import { getRivers } from "./api/getRivers";
import { getRoads } from "./api/getRoads";

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string>;
}) {
  const selectedRivers = searchParams?.selected_rivers;
  const selectedRiversArr = selectedRivers?.split(",");

  const rivers = await getRivers(selectedRiversArr);
  const roads = await getRoads();

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Map
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        initialViewState={{
          latitude: 50.049683,
          longitude: 19.944544,
          zoom: 10,
        }}
        sourceData={roads}
        features={combineMultipleRiversIntoOne(rivers.coordinates)}
      />
      <Sidebar roads={roads} />
    </Suspense>
  );
}
