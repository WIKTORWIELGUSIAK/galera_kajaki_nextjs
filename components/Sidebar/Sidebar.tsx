"use client";
import Form from "@/Form/Form";
import RoadButton from "@/RoadButton/RoadButton";
import RoadInformations from "@/RoadInformations/RoadInformations";
import type { Road } from "@/RoadTypes";
import { findObjectById } from "@/findObjectById";
import useStore from "@/store";
import { useGetValueFromSearchParams } from "@/useGetValueFromSearchParams";

type SidebarProps = {
  roads: Road[];
};

const Sidebar = ({ roads }: SidebarProps) => {
  const { setRoadId } = useStore();
  const displayInfo = useGetValueFromSearchParams("selected_road");

  const onMouseLeaveHandler = () => {
    setRoadId(null);
  };

  const edit = false;
  const selectedRoadId = useGetValueFromSearchParams("selected_road");

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
                    <RoadButton key={road.id} road={road} />
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
