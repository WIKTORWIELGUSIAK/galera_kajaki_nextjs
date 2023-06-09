import Map from "@/Map/Map";
import Sidebar from "@/Sidebar/Sidebar";
import { combineMultipleRiversIntoOne } from "@/combineMultipleRiversIntoOne";
import createSourcesData from "@/createSourcesData";
import { getRoads } from "@/getRoads";
import { getRiversBySlug } from "@/search_river";

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const roads = await getRoads();
  const selectedRivers = await getRiversBySlug(searchParams?.selected_rivers);

  return (
    <div className="h-screen w-screen">
      <Map
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        initialViewState={{
          latitude: 50.049683,
          longitude: 19.944544,
          zoom: 10,
        }}
        sourceData={createSourcesData(roads)}
        features={combineMultipleRiversIntoOne(selectedRivers.coordinates)}
      />
      <Sidebar roads={roads} />
    </div>
  );
}
