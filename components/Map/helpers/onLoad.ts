import type { OnLoadArgs } from "@/MapTypes";

export const onLoad = ({ e, setMapLoaded }: OnLoadArgs): void => {
  const { target } = e;

  setMapLoaded(true);
  target.on("mouseenter", "selectedRivers", () => {
    target.getCanvas().style.cursor = "pointer";
  });
  target.on("mouseleave", "selectedRivers", () => {
    target.getCanvas().style.cursor = "default";
  });
};
