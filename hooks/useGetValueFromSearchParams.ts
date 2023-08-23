import { useSearchParams } from "next/navigation";

export const useGetValueFromSearchParams = (searchParam: string): string => {
  const searchParams = useSearchParams();
  const value = searchParams.get(searchParam) || "";
  return value;
};
