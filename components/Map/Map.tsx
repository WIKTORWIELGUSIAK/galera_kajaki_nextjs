"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Map as MapGL, Marker } from "react-map-gl";
import MapSourceLayer from "@/MapSourceLayer/MapSourceLayer";
import type { MapSourceLayerProps } from "@/MapSourceLayerTypes";
import type { MapProps } from "@/MapTypes";
import {
  newRoadLayer,
  selectedRiversLayer,
  sourceProperties,
} from "@/constants";
import { createLineFeature } from "@/createLineFeature";
import useGetValueFromSearchParams from "@/hooks/useGetValueFromSearchParams";
import usePathFinder from "@/hooks/usePathFinder";
import useStore from "@/store";
import { addMarkerOnLayerClick } from "./helpers/addMarkerOnLayerClick";
import { markerHandleDragEnd } from "./helpers/markerHandleDragEnd";
import { onLoad } from "./helpers/onLoad";
import type { MarkerProps, MapRef, MapLayerMouseEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map({
  initialViewState,
  mapStyle,
  sourceData,
  features,
}: MapProps) {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const newRoadCoordinates = usePathFinder(features, markers);
  const newRoadFeatures = createLineFeature(newRoadCoordinates);
  const searchParams = useSearchParams();
  const selectedRoad = useGetValueFromSearchParams("selected_road");
  const addMode = useGetValueFromSearchParams("add_road");

  const selectedRivers = useGetValueFromSearchParams("selected_rivers");
  const mapRef = useRef<MapRef>(null);

  const { roadId, setRoadId, setNewRoadCoordinates } = useStore();

  const displaySelectedRoads = useCallback(() => {
    const map = mapRef.current;
    const style = map?.getMap().getStyle();
    const roadLayers = style?.layers.filter((layer) =>
      /^road\d+/.test(layer.id)
    );

    if (searchParams.toString().includes("selected_road")) {
      roadLayers?.forEach((layer) => {
        const opacity = layer.id === `road${selectedRoad}` ? 1 : 0.1;
        map?.getMap().setPaintProperty(layer.id, "line-opacity", opacity);
        setRoadId(null);
      });
    } else if (roadId !== null) {
      roadLayers?.forEach((layer) => {
        const opacity = layer.id === `road${roadId}` ? 1 : 0.1;
        map?.getMap().setPaintProperty(layer.id, "line-opacity", opacity);
      });
    } else {
      roadLayers?.forEach((layer) => {
        map?.getMap().setPaintProperty(layer.id, "line-opacity", 1);
      });
    }
  }, [roadId, searchParams, selectedRoad, setRoadId]);
  useEffect(() => {
    setNewRoadCoordinates(newRoadCoordinates);
  }, [newRoadCoordinates, setNewRoadCoordinates]);
  useEffect(() => {
    displaySelectedRoads();
  }, [displaySelectedRoads, roadId, searchParams]);
  const handleLayerClick = useCallback(
    ({ lngLat }: MapLayerMouseEvent) => {
      addMarkerOnLayerClick({
        lngLat,
        markers,
        setMarkers,
        features,
      });
    },
    [features, markers]
  );
  useEffect(() => {
    mapRef.current?.on("click", "selectedRivers", () => handleLayerClick);
    return () => {
      mapRef.current?.off("click", "selectedRivers", () => handleLayerClick);
    };
  }, [features, markers, selectedRivers.length, handleLayerClick]);
  return (
    <MapGL
      onLoad={(e) => onLoad({ e, handleLayerClick })}
      onStyleData={displaySelectedRoads}
      ref={mapRef}
      styleDiffing={true}
      initialViewState={initialViewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onMouseEnter={(e) => e}
    >
      {markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            {...marker}
            onDragEnd={(e) =>
              markerHandleDragEnd({
                markerIndex: index,
                lngLat: e.lngLat,
                markers,
                setMarkers,
                features,
              })
            }
          />
        ))}
      <MapSourceLayer
        sourceProperties={sourceProperties(features, "selectedRivers")}
        layerProperties={selectedRiversLayer}
      />
      {!addMode &&
        sourceData.map((road: MapSourceLayerProps) => (
          <MapSourceLayer
            key={road.sourceProperties.id}
            sourceProperties={road.sourceProperties}
            layerProperties={road.layerProperties}
          />
        ))}
      <MapSourceLayer
        sourceProperties={sourceProperties(newRoadFeatures, "newRoad")}
        layerProperties={newRoadLayer}
      />
    </MapGL>
  );
}
