"use client";
import { useState, type FormEvent, useCallback, useEffect } from "react";
import InputField from "@/InputField/InputField";
import type { InputProps } from "@/InputTypes";
import type { Road } from "@/RoadTypes";
import fetchRoad from "@/api/fetchRoad.POST";
import updateRoad from "@/api/updateRoad.PATCH";
import createSlug from "@/createSlug";
import useGetValueFromSearchParams from "@/hooks/useGetValueFromSearchParams";
import { useQueryParams } from "@/hooks/useQueryParams";
import useStore from "@/store";
import { formConfig } from "./config";
import type { ChangeEvent } from "react";

export default function RoadForm({ road }: { road: Road | undefined }) {
  const { mutateQueryParams } = useQueryParams();
  const [formData, setFormData] = useState({
    selected_rivers: "",
    roadName: "",
    roadDescription: "",
    roadColor: "",
  });
  const { newRoadCoordinates, setNewRoadCoordinates, setColor } = useStore();
  useEffect(() => {
    if (road) {
      setFormData({
        selected_rivers: road.selectedRivers,
        roadName: road.name,
        roadDescription: road.properties.description,
        roadColor: road.properties.color,
      });
      mutateQueryParams(
        { selected_rivers: road.selectedRivers },
        { mode: "append" }
      );
      setColor(road.properties.color);
      setNewRoadCoordinates(road.roadCoordinates);
    }
  }, []);
  const selectedRivers = useGetValueFromSearchParams("selected_rivers");
  const editMode = useGetValueFromSearchParams("edit_road");
  const addRiver = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const slug = createSlug(formData.selected_rivers);
      mutateQueryParams({ selected_rivers: slug }, { mode: "append" });
    },
    [formData, mutateQueryParams]
  );
  const addRoad = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const properties = {
      description: formData.roadDescription,
      color: formData.roadColor,
    };

    // TODO: Przeżucić stringify na backend
    const roadDetails = {
      name: formData.roadName,
      roadCoordinates: JSON.stringify(newRoadCoordinates),
      selectedRivers,
      properties: JSON.stringify(properties),
    };
    if (!editMode) {
      fetchRoad(roadDetails);
    } else {
      const patchRoadDetails = { ...roadDetails, id: road?.id };
      updateRoad(patchRoadDetails);
    }
    setNewRoadCoordinates([]);
    mutateQueryParams({}, { mode: "reset" });
  };
  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "roadColor") {
      setColor(value);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {!editMode && (
        <form onSubmit={addRiver} className="flex w-full flex-col gap-y-2">
          <InputField
            label="Dodaj rzeki do wyświetlania"
            id="selected_rivers"
            name="selected_rivers"
            handleChange={handleChange}
          />
          <button className="rounded-md bg-wood py-1 font-semibold text-white shadow-md hover:bg-blue-600">
            Dodaj
          </button>
        </form>
      )}
      <form
        className="flex w-full flex-col gap-y-2"
        onSubmit={(e) => addRoad(e)}
      >
        {formConfig.map((inputProps: InputProps) => (
          <InputField
            key={inputProps.id}
            value={formData[inputProps.id as keyof typeof formData]}
            {...inputProps}
            handleChange={handleChange}
          />
        ))}
        <button className=" rounded-md bg-wood px-3 py-1 font-semibold text-white shadow-md">
          Dodaj trasę
        </button>
      </form>
    </div>
  );
}
