"use client";
import { useSearchParams, useRouter } from "next/navigation";
import createSlug from "@/createSlug";
import type { FormEvent } from "react";

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selected_rivers = new URLSearchParams("selected_rivers");
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    const currentRivers = searchParams.getAll("selected_rivers").toString();
    router.push(
      `?${selected_rivers}${currentRivers}${currentRivers && ","}${createSlug(
        formValues.selected_rivers
      )}`
    );
  };

  return (
    <form
      onSubmit={submitHandler}
      className="left-0 top-0 m-3 flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md"
    >
      <h2 className="mb-2 text-sm font-semibold">Dodaj rzekę</h2>
      <div className="mb-2">
        <label className="text-xs font-medium">Nazwa rzeki</label>
        <input
          type="text"
          name="selected_rivers"
          className="text-xxs mt-1 rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
        ></input>
      </div>
      <button className="text-xxs rounded-md bg-wood px-3 py-1 font-semibold text-white shadow-md hover:bg-blue-600">
        Dodaj
      </button>
    </form>
  );
};

export default Form;
