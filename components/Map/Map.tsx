"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Map as MapGL, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapSourceLayer from "@/MapSourceLayer/MapSourceLayer";
import type { MapSourceLayerProps } from "@/MapSourceLayerTypes";
import type { MapProps } from "@/MapTypes";
import { newRoadLayer, sourceProperties } from "@/constants";
import { createLineFeature } from "@/createLineFeature";
import usePathFinder from "@/hooks/usePathFinder/usePathFinder";
import { addMarkerOnLayerClick } from "./helpers/addMarkerOnLayerClick";
import { markerHandleDragEnd } from "./helpers/markerHandleDragEnd";
import { onLoad } from "./helpers/onLoad";
import type { MarkerProps, MapRef, MapLayerMouseEvent } from "react-map-gl";

const Map = ({
  initialViewState,
  width,
  height,
  mapStyle,
  sourceData,
  features,
}: MapProps) => {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const newRoadCoordinates = usePathFinder(features, markers);
  const newRoadFeatures = createLineFeature(newRoadCoordinates);
  const searchParams = useSearchParams();
  const mapRef = useRef<MapRef>(null);
  useEffect(() => {
    const map = mapRef.current;
    const style = map?.getMap().getStyle();
    const roadLayers = style?.layers.filter((layer) =>
      /^road\d+/.test(layer.id)
    );
    if (searchParams.toString().includes("selected_road")) {
      roadLayers?.map((layer) => {
        map?.getMap().setLayoutProperty(layer.id, "visibility", "none");
      });
      map
        ?.getMap()
        .setLayoutProperty(
          `road${searchParams.toString().split("=")[1]}`,
          "visibility",
          "visible"
        );
    } else {
      roadLayers?.map((layer) => {
        map?.getMap().setLayoutProperty(layer.id, "visibility", "visible");
      });
    }
  }, [searchParams]);
  useEffect(() => {
    const map = mapRef.current;
    const handleLayerClick = ({ lngLat }: MapLayerMouseEvent) => {
      addMarkerOnLayerClick({
        lngLat,
        markers,
        setMarkers,
        features,
      });
    };
    map?.on("click", "selectedRivers", handleLayerClick);

    return () => {
      map?.off("click", "selectedRivers", handleLayerClick);
    };
  }, [features, markers]);

  return (
    <MapGL
      onLoad={(e) => onLoad(e)}
      ref={mapRef}
      initialViewState={initialViewState}
      style={{ width, height }}
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
      {sourceData.map((road: MapSourceLayerProps) => (
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
};

export default Map;
