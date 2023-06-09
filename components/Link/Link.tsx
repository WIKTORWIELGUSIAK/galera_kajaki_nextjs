"use client";

import { useRouter } from "next/navigation";
import type { LinkProps } from "@/SidebarTypes";

const Link = ({ road }: LinkProps) => {
  console.log("Link");
  const router = useRouter();
  const selectedRoad = new URLSearchParams("selected_road");
  const onMouseEnterHandler = () => {
    router.replace(`?${selectedRoad}${road.id}`);
  };
  return (
    <div
      onMouseEnter={onMouseEnterHandler}
      className="flex w-full justify-between rounded-xl bg-wood px-2 py-1 font-semibold text-white"
    >
      <div>{road.name}</div>
      <button>{"->"}</button>
    </div>
  );
};

export default Link;
