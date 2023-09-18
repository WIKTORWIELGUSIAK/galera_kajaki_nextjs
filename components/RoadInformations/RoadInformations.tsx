import { Edit, ArrowLeftCircle } from "lucide-react";
import React from "react";
import type { Road } from "@/RoadTypes";
import { useQueryParams } from "@/hooks/useQueryParams";
type RoadInformationsProps = {
  road: Road | undefined;
};
export default function RoadInformations({ road }: RoadInformationsProps) {
  const { mutateQueryParams } = useQueryParams();

  const editRoad = () => {
    mutateQueryParams({ edit_road: true });
  };
  const backToList = () => {
    mutateQueryParams(["selected_road", ""], { mode: "delete" });
  };
  return (
    <div className="relative top-1 flex flex-col justify-center">
      <h2 className="text-xl font-bold">{road?.name}</h2>
      <div className="buttons absolute right-0 top-0.5 flex gap-3">
        <ArrowLeftCircle
          onClick={backToList}
          className="hover:cursor-pointer"
        />
        <Edit onClick={editRoad} className="hover:cursor-pointer" />
      </div>
      <p className="mt-3">{road?.properties?.description}</p>
    </div>
  );
}
