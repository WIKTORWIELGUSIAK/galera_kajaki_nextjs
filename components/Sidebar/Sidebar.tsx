"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/Form/Form";
import RoadInformations from "@/RoadInformations/RoadInformations";
import type { Road } from "@/RoadTypes";
import { findObjectById } from "@/findObjectById";
import useStore from "@/store";
import { useGetValueFromSearchParams } from "@/useGetValueFromSearchParams";

type SidebarProps = {
  roads: Road[];
};

const Sidebar = ({ roads }: SidebarProps) => {
  const { roadId, setRoadId } = useStore();
  const displayInfo = useGetValueFromSearchParams("selected_road");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onMouseLeaveHandler = () => {
    setRoadId(null);
  };
  const onMouseEnterHandler = (road: Road) => {
    setRoadId(road.id);
  };
  const edit = false;
  const selectedRoadId = useGetValueFromSearchParams("selected_road");
  const onClickHandler = () => {
    const displayRoadInfo = new URLSearchParams("selected_road");
    router.push(`?${searchParams}${displayRoadInfo}${roadId}`);
  };
  const selectedRoad = findObjectById(roads, selectedRoadId);
  return (
    <div className="absolute left-2 top-2 z-50 flex flex-col bg-wood">
      <div className="left-0  top-0 m-3 flex w-[250px] flex-col gap-1 rounded-lg bg-white p-4 shadow-md">
        {edit ? (
          <Form />
        ) : (
          <div>
            <h1 className=" w-full text-left text-2xl font-extrabold text-[#512b1e]">
              GALERA
            </h1>
            <div>
              {!displayInfo ? (
                <div
                  className="flex w-3/4 flex-col gap-1"
                  onMouseLeave={onMouseLeaveHandler}
                >
                  {roads.map((road) => (
                    <div
                      onClick={onClickHandler}
                      key={road.id}
                      onMouseEnter={() => onMouseEnterHandler(road)}
                      className="flex w-full cursor-pointer justify-between rounded-xl bg-wood px-2 py-1 font-semibold text-white"
                    >
                      <div>{road.name}</div>
                      <button>{"->"}</button>
                    </div>
                  ))}
                </div>
              ) : (
                <RoadInformations road={selectedRoad} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
