import React from "react";
import type { RoadButtonProps } from "@/RoadButtonTypes";
import type { Road } from "@/RoadTypes";
import { useQueryParams } from "@/hooks/useQueryParams";
import useStore from "@/store";

export default function RoadButton({ road, name }: RoadButtonProps) {
  const { roadId, setRoadId } = useStore();
  const { mutateQueryParams } = useQueryParams();
  const onClickHandler = () => {
    if (roadId) {
      mutateQueryParams({ selected_road: roadId });
    } else {
      mutateQueryParams({ add_road: true });
    }
  };
  const onMouseEnterHandler = (road: Road | undefined) => {
    road ? setRoadId(road.id) : setRoadId(null);
  };
  return (
    <button
      onClick={onClickHandler}
      onMouseEnter={() => onMouseEnterHandler(road)}
      className="flex w-full cursor-pointer justify-between rounded-xl bg-wood px-2 py-1 font-semibold text-white"
    >
      {road ? road.name : name}
      <span>{road ? "->" : "+"}</span>
    </button>
  );
}
