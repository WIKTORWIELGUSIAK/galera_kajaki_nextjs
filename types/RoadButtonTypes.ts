import type { Road } from "./RoadTypes";

type NameProps = {
  name: string;
  road?: never;
};

type RoadProps = {
  road: Road;
  name?: never;
};

export type RoadButtonProps = NameProps | RoadProps;
