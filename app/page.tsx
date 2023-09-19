import { Suspense, lazy } from "react";
const Map = lazy(() => import("@/Map/Map"));
import Sidebar from "@/Sidebar/Sidebar";
import { combineMultipleRiversIntoOne } from "@/combineMultipleRiversIntoOne";
// import fetchRivers from "./api/fetchRivers.GET";
import fetchRoads from "./api/fetchRoads.GET";

export default async function Home({}: // searchParams,
{
  params: { slug: string };
  searchParams?: Record<string, string>;
}) {
  const rivers = {
    names: "",
    slugs: "",
    coordinates: [[]],
  };
  const roads = await fetchRoads();

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
