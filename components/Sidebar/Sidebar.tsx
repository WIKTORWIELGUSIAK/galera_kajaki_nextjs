"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Form from "@/Form/Form";
import Link from "@/Link/Link";
import type { Road } from "@/RoadTypes";

type SidebarProps = {
  roads: Road[];
};

const Sidebar = ({ roads }: SidebarProps) => {
  console.log("sidebar");
  const router = useRouter();
  const onMouseLeaveHandler = () => {
    router.replace("");
  };
  return (
    <div className="absolute left-2 top-2 z-50 flex flex-col bg-wood">
      <div className="left-0  top-0 m-3 flex w-[250px] flex-col gap-1 rounded-lg bg-white p-4 shadow-md">
        {/* <Form /> */}
        <h1 className=" w-full text-left text-2xl font-extrabold text-[#512b1e]">
          GALERA
        </h1>
        <div
          className="flex w-3/4 flex-col gap-1"
          onMouseLeave={onMouseLeaveHandler}
        >
          {roads.map((road) => (
            <Link key={road.id} road={road} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
