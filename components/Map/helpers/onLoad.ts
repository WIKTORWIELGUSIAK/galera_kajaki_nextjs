import type { OnLoadArgs } from "@/MapTypes";

export const onLoad = ({ e, handleLayerClick }: OnLoadArgs): void => {
  const { target } = e;

  // todo: Create autosuggestion for id

  target.on("click", "selectedRivers", handleLayerClick);
  target.on("mouseenter", "selectedRivers", () => {
    target.getCanvas().style.cursor = "pointer";
  });
  target.on("mouseleave", "selectedRivers", () => {
    target.getCanvas().style.cursor = "default";
  });
};
