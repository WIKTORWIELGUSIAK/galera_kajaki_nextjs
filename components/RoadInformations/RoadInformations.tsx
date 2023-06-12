import React from "react";
import type { Road } from "@/RoadTypes";
type RoadInformationsProps = {
  road: Road | undefined;
};
const RoadInformations = ({ road }: RoadInformationsProps) => (
  <div>
    <h1 className=" text-l font-bold">Nazwa trasy:</h1>
    <p>{road?.name}</p>
    <h1 className=" text-l font-bold">Opis trasy:</h1>
    <p>{road?.properties?.description}</p>
  </div>
);

export default RoadInformations;
