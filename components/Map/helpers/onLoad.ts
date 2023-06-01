/** @format */

import type { OnLoad } from "@/MapTypes";
import { layerHandleClick } from "./layerHandleClick";

export const onLoad = ({ e, markers, setMarkers }: OnLoad): void => {
  // todo: Create autosuggestion for id
  e.target.on("mouseenter", "selectedRivers", () => {
    e.target.getCanvas().style.cursor = "pointer";
  });
  e.target.on("mouseleave", "selectedRivers", () => {
    e.target.getCanvas().style.cursor = "default";
  });
  e.target.on("click", "selectedRivers", (e) =>
    layerHandleClick({ lngLat: e.lngLat, markers, setMarkers })
  );
};
