"use client";
import RoadButton from "@/RoadButton/RoadButton";
import RoadForm from "@/RoadForm/RoadForm";
import RoadInformations from "@/RoadInformations/RoadInformations";
import type { Road } from "@/RoadTypes";
import { findObjectById } from "@/findObjectById";
import { useGetValueFromSearchParams } from "@/hooks/useGetValueFromSearchParams";
import useStore from "@/store";

type SidebarProps = {
  roads: Road[];
};

const Sidebar = ({ roads }: SidebarProps) => {
  const { setRoadId } = useStore();
  const displayInfo = useGetValueFromSearchParams("selected_road");
  const addMode = useGetValueFromSearchParams("add_road");

  const onMouseLeaveHandler = () => {
    setRoadId(null);
  };

  const edit = false;
  const selectedRoadId = useGetValueFromSearchParams("selected_road");
  const selectedRoad = findObjectById(roads, selectedRoadId);
  return (
    <div className="absolute left-2 top-2 z-50 flex flex-col bg-wood">
      <div className="left-0  top-0 m-3 flex w-[250px] flex-col gap-1 rounded-lg bg-white p-4 shadow-md">
        <h1 className=" w-full text-left text-2xl font-extrabold text-[#512b1e]">
          GALERA
        </h1>
        {addMode ? (
          <RoadForm />
        ) : edit ? (
          <div>
            <RoadForm></RoadForm>
          </div>
        ) : (
          <div>
            <div>
              {!displayInfo ? (
                <div
                  className="flex w-3/4 flex-col gap-1"
                  onMouseLeave={onMouseLeaveHandler}
                >
                  <RoadButton name="Dodaj trasę" />
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
