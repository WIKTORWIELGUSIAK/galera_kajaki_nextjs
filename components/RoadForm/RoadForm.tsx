"use client";
import { useState, type FormEvent } from "react";
import Input from "@/Input/Input";
import type { InputProps } from "@/InputTypes";
import fetchRoad from "@/api/fetchRoad.POST";
import createSlug from "@/createSlug";
import { useGetValueFromSearchParams } from "@/hooks/useGetValueFromSearchParams";
import { useQueryParams } from "@/hooks/useQueryParams";
import useStore from "@/store";
import { formConfig } from "./config";
import type { ChangeEvent } from "react";

export default function RoadForm() {
  const { mutateQueryParams } = useQueryParams();
  const [formData, setFormData] = useState({
    selected_rivers: "",
    roadName: "",
    roadDescription: "",
    roadColor: "",
  });
  const { newRoadCoordinates } = useStore();
  const selectedRivers = useGetValueFromSearchParams("selected_rivers");

  const addRiver = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const slug = createSlug(formData.selected_rivers);
    mutateQueryParams({ selected_rivers: slug }, { mode: "append" });
  };

  const addRoad = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const properties = {
      description: formData.roadDescription,
      color: formData.roadColor,
    };

    // TODO: Przeżucić stringify na backend
    const roadDetails = {
      name: JSON.stringify(formData.roadName),
      roadCoordinates: JSON.stringify(newRoadCoordinates),
      selectedRivers,
      properties: JSON.stringify(properties),
    };
    fetchRoad(roadDetails);
  };
  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={addRiver} className="flex w-full flex-col gap-y-2">
        <Input
          label="Dodaj rzeki do wyświetlania"
          id="selected_rivers"
          name="selected_rivers"
          onChange={handleChange}
        />
        <button className="rounded-md bg-wood py-1 font-semibold text-white shadow-md hover:bg-blue-600">
          Dodaj
        </button>
      </form>
      <form
        className="flex w-full flex-col gap-y-2"
        onSubmit={(e) => addRoad(e)}
      >
        {formConfig.map((inputProps: InputProps) => (
          <Input key={inputProps.id} {...inputProps} onChange={handleChange} />
        ))}
        <button className=" rounded-md bg-wood px-3 py-1 font-semibold text-white shadow-md">
          Dodaj trasę
        </button>
      </form>
    </div>
  );
}
