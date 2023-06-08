import type { MapboxEvent } from "react-map-gl";

export const onLoad = ({ target }: MapboxEvent<undefined>): void => {
  // todo: Create autosuggestion for id
  target.on("mouseenter", "selectedRivers", () => {
    target.getCanvas().style.cursor = "pointer";
  });
  target.on("mouseleave", "selectedRivers", () => {
    target.getCanvas().style.cursor = "default";
  });
};
