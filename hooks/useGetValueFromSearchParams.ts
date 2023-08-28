import { useSearchParams } from "next/navigation";

export default function useGetValueFromSearchParams(
  searchParam: string
): string {
  const searchParams = useSearchParams();
  const value = searchParams.get(searchParam) || "";
  return value;
}
