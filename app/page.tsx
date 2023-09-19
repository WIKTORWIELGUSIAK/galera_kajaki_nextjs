import { Suspense, lazy } from "react";
const Map = lazy(() => import("@/Map/Map"));
import Sidebar from "@/Sidebar/Sidebar";
import { combineMultipleRiversIntoOne } from "@/combineMultipleRiversIntoOne";
import { prisma } from "@/lib/prisma";
// import fetchRivers from "./api/fetchRivers.GET";
// import fetchRoads from "./api/fetchRoads.GET";

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string>;
}) {
  const selectedRivers = searchParams?.selected_rivers;
  const selectedRiversArr = selectedRivers?.split(",");
  const riversData = await prisma.riversV2.findMany({
    where: {
      OR: selectedRiversArr?.map((slug) => ({
        slug: {
          contains: slug,
        },
      })),
    },
    select: {
      id: true,
      name: true,
      coordinates: true,
      properties: true,
    },
  });
  // const rivers = await fetchRivers(searchParams);
  const result = {
    names: selectedRiversArr,
    slugs: searchParams?.selected_rivers,
    coordinates: riversData.map((river) => JSON.parse(river.coordinates)),
  };
  // const roads = await fetchRoads();

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Map
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        initialViewState={{
          latitude: 50.049683,
          longitude: 19.944544,
          zoom: 10,
        }}
        sourceData={[]}
        features={combineMultipleRiversIntoOne(result.coordinates)}
      />
      <Sidebar roads={[]} />
    </Suspense>
  );
}
