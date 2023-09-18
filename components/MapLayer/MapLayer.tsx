import React from "react";
import { Layer } from "react-map-gl";

export default function MapLayer({ color, id }: { color: string; id: string }) {
  return (
    <Layer
      id={id}
      source={id}
      type="line"
      layout={{
        "line-cap": "round",
        "line-join": "round",
      }}
      paint={{
        "line-color": color,
        "line-width": 6,
        "line-opacity": 1,
      }}
    />
  );
}
