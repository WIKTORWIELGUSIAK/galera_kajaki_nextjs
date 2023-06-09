import type { Road } from "@/RoadTypes";
import type { SourceData } from "@/sourceDataTypes";

const createSourcesData = (data: Road[]): SourceData[] => {
  const roadsData: SourceData[] = [];
  data.map((road) => {
    roadsData.push({
      sourceProperties: {
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: JSON.parse(road.roadCoordinates),
              },
              properties: {
                title: "Road",
                "marker-symbol": "monument",
              },
            },
          ],
        },
        id: `road${road.id}`,
        type: "geojson",
      },
      layerProperties: {
        type: "line",
        source: `road${road.id}`,
        paint: {
          "line-color": `${JSON.parse(road.properties).color}`,
          "line-width": 6,
          "line-opacity": 1,
        },
      },
    });
  });

  return roadsData;
};

export default createSourcesData;
