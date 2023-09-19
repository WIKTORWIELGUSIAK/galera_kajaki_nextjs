"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Map as MapGL, Marker } from "react-map-gl";
import MapLayer from "@/MapLayer/MapLayer";
import MapSource from "@/MapSource/MapSource";
import type { MapProps } from "@/MapTypes";
import type { RoadType } from "@/RoadType";
import { createLineFeature } from "@/createLineFeature";
import useGetValueFromSearchParams from "@/hooks/useGetValueFromSearchParams";
import usePathFinder from "@/hooks/usePathFinder";
import useStore from "@/store";
import { addMarkerOnLayerClick } from "./helpers/addMarkerOnLayerClick";
import { markerHandleDragEnd } from "./helpers/markerHandleDragEnd";
import { onLoad } from "./helpers/onLoad";
import type { MapMouseEvent } from "mapbox-gl";
import type { MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
export default function Map({
  initialViewState,
  mapStyle,
  sourceData,
  features,
}: MapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const {
    roadId,
    setRoadId,
    newRoadCoordinates,
    color,
    markers,
    setMarkers,
    addMarker,
  } = useStore();
  usePathFinder(features, markers);
  const newRoadFeatures = createLineFeature(newRoadCoordinates);
  const selectedRoad = useGetValueFromSearchParams("selected_road");
  const addMode = useGetValueFromSearchParams("add_road");
  const selectedRivers = useGetValueFromSearchParams("selected_rivers");
  const mapRef = useRef<MapRef>(null);
  const displaySelectedRoads = useCallback(() => {
    const map = mapRef.current;
    const style = map?.getMap().getStyle();
    const roadLayers = style?.layers.filter((layer) =>
      /^road\d+/.test(layer.id)
    );

    if (selectedRoad) {
      roadLayers?.forEach((layer) => {
        map?.getMap().setPaintProperty(layer.id, "line-opacity", 0);
        setRoadId(null);
      });
    } else if (roadId !== null) {
      roadLayers?.forEach((layer) => {
        const opacity = layer.id === `road${roadId}` ? 1 : 0.1;
        map?.getMap().setPaintProperty(layer.id, "line-opacity", opacity);
      });
    } else {
      setMarkers([]);
      roadLayers?.forEach((layer) => {
        map?.getMap().setPaintProperty(layer.id, "line-opacity", 1);
      });
    }
  }, [roadId, selectedRoad, setMarkers, setRoadId]);
  useEffect(() => {
    displaySelectedRoads();
  }, [displaySelectedRoads]);
  const handleLayerClick = useCallback(
    ({ lngLat }: MapMouseEvent) => {
      addMarkerOnLayerClick({
        lngLat,
        markers,
        addMarker,
        features,
      });
    },
    [addMarker, features, markers]
  );
  useEffect(() => {
    const map = mapRef.current;
    map?.on("click", "selectedRivers", handleLayerClick);
    return () => {
      map?.off("click", "selectedRivers", handleLayerClick);
    };
  }, [features, markers, selectedRivers, handleLayerClick, mapLoaded]);
  useEffect(() => {
    mapRef.current?.getMap().setPaintProperty("newRoad", "line-color", color);
  }, [color]);

  return (
    <MapGL
      onLoad={(e) => onLoad({ e, setMapLoaded })}
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
      <MapSource id="selectedRivers" features={features}>
        <MapLayer color="blue" id="selectedRivers" />
      </MapSource>
      {!addMode &&
        sourceData.map((road: RoadType) => (
          <MapSource
            key={road.id}
            id={`road${road.id}`}
            features={createLineFeature(road.roadCoordinates)}
          >
            <MapLayer color={road.properties.color} id={`road${road.id}`} />
          </MapSource>
        ))}
      <MapSource id="newRoad" features={newRoadFeatures}>
        <MapLayer color={color} id="newRoad" />
      </MapSource>
    </MapGL>
  );
}
