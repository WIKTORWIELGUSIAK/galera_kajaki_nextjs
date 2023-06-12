import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import type { Road } from "@/RoadTypes";
import useStore from "@/store";
type RoadButtonProps = {
  road: Road;
};
const RoadButton = ({ road }: RoadButtonProps) => {
  const { roadId, setRoadId } = useStore();
  const router = useRouter();

  const searchParams = useSearchParams();
  const onClickHandler = () => {
    const displayRoadInfo = new URLSearchParams("selected_road");
    router.push(`?${searchParams}${displayRoadInfo}${roadId}`);
  };
  const onMouseEnterHandler = (road: Road) => {
    setRoadId(road.id);
  };
  return (
    <div
      onClick={onClickHandler}
      onMouseEnter={() => onMouseEnterHandler(road)}
      className="flex w-full cursor-pointer justify-between rounded-xl bg-wood px-2 py-1 font-semibold text-white"
    >
      <div>{road?.name}</div>
      <button>{"->"}</button>
    </div>
  );
};

export default RoadButton;
