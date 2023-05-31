/** @format */
"use client";

import React, { useState } from "react";
import { Layer, Map as MapGL, Marker, Source } from "react-map-gl";
import type { MapProps } from "@/types/Map";
import createSourcesData from "@/utils/createSourcesData";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Feature, GeoJsonProperties, LineString } from "geojson";
import type {
  LayerProps,
  MarkerDragEvent,
  MarkerProps,
  SourceProps,
} from "react-map-gl";

const Map = ({
  initialViewState,
  width,
  height,
  mapStyle,
  data,
  wisła,
}: MapProps) => {
  const { lat, lng, zoom } = initialViewState;
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const roadsData = createSourcesData(data);
  const handleDragEnd = (markerIndex: number, e: MarkerDragEvent) => {
    const { lngLat } = e;
    const updatedMarkers = markers.map((marker, index) =>
      index === markerIndex
        ? { ...marker, latitude: lngLat.lat, longitude: lngLat.lng }
        : marker
    );
    setMarkers(updatedMarkers);
  };
  const properties = {
    title: "Road",
    "marker-symbol": "monument",
  };
  function CombineMultipleRiversIntoOne(coordinates: [][]) {
    const features: Feature<LineString, GeoJsonProperties>[] = [];
    coordinates.map((coordinatesArray: [][]) => {
      const feature = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinatesArray,
        },
        properties: properties,
      };
      features.push(feature as Feature<LineString, GeoJsonProperties>);
    });
    return features;
  }
  const simpleWisła = CombineMultipleRiversIntoOne(wisła.coordinates);
  console.log(simpleWisła);
  const handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (markers.length < 2) {
      const marker = {
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
        draggable: true,
      };
      setMarkers([...markers, marker]);
    }
  };
  const newRoadSourceProperties: SourceProps = {
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates:
              markers.length > 1
                ? [
                    [markers[0].longitude, markers[0].latitude],
                    [markers[1].longitude, markers[1].latitude],
                  ]
                : [],
          },
          properties: {
            title: "Road",
          },
        },
      ],
    },
    id: `newRoad`,
    type: "geojson",
  };

  const selectedRivers: SourceProps = {
    data: {
      type: "FeatureCollection",
      features: simpleWisła,
    },
    id: `selectedRivers`,
    type: "geojson",
  };

  const newRoadLayerProperties: LayerProps = {
    type: "line",
    source: `newRoad`,
    paint: {
      "line-color": `black`,
      "line-width": 6,
      "line-opacity": 1,
    },
  };
  const selectedRiversLayer: LayerProps = {
    type: "line",
    source: `selectedRivers`,
    paint: {
      "line-color": `lightblue`,
      "line-width": 6,
      "line-opacity": 1,
    },
  };
  return (
    <div className="h-full w-full">
      <MapGL
        onClick={handleClick}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        style={{ width, height }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {markers.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              {...marker}
              onDragEnd={(e) => handleDragEnd(index, e)}
            />
          ))}
        <Source {...newRoadSourceProperties}>
          <Layer {...newRoadLayerProperties} />
        </Source>
        <Source {...selectedRivers}>
          <Layer {...selectedRiversLayer} />
        </Source>
        {roadsData.map((road) => (
          <Source key={road.sourceProperties.id} {...road.sourceProperties}>
            <Layer {...road.layerProperties} />
          </Source>
        ))}
      </MapGL>
    </div>
  );
};

export default Map;
