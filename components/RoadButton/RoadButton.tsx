import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import type { Road } from "@/RoadTypes";
import useStore from "@/store";
interface NameProps {
  name: string;
  road?: never;
}

interface RoadProps {
  road: Road;
  name?: never;
}

type RoadButtonProps = NameProps | RoadProps;

const RoadButton = ({ road, name }: RoadButtonProps) => {
  const { roadId, setRoadId } = useStore();
  const router = useRouter();

  const searchParams = useSearchParams();
  const onClickHandler = () => {
    const displayRoadInfo = new URLSearchParams("selected_road");
    const addRoad = new URLSearchParams("add_road");
    router.push(
      `?${searchParams}${road ? displayRoadInfo : addRoad}${
        road ? roadId : "true"
      }`
    );
  };
  const onMouseEnterHandler = (road: Road | undefined) => {
    road ? setRoadId(road.id) : setRoadId(null);
  };
  return (
    <button
      onClick={onClickHandler}
      //   onMouseEnter={() => onMouseEnterHandler(road)}
      onMouseEnter={() => onMouseEnterHandler(road)}
      className="flex w-full cursor-pointer justify-between rounded-xl bg-wood px-2 py-1 font-semibold text-white"
    >
      {road ? road.name : name}
      <span>{road ? "->" : "+"}</span>
    </button>
  );
};

export default RoadButton;
