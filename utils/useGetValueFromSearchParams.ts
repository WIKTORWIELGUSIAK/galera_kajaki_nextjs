import { useSearchParams } from "next/navigation";

export const useGetValueFromSearchParams = (searchParam: string): string => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const value = params.get(searchParam) || "";
  return value;
};
