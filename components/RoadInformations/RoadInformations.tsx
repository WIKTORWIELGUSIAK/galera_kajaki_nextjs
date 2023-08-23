import { Icon } from "@iconify/react";
import React from "react";
import type { Road } from "@/RoadTypes";
type RoadInformationsProps = {
  road: Road | undefined;
};
const RoadInformations = ({ road }: RoadInformationsProps) => (
  <div>
    <h2 className="text-l font-bold">Nazwa trasy:</h2>
    <p>{road?.name}</p>
    <h2 className="text-l font-bold">Opis trasy:</h2>
    <p>{road?.properties?.description}</p>
    <button>
      <Icon icon="mdi-light:arrow-left-circle"></Icon>
    </button>
  </div>
);

export default RoadInformations;
