import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

type QueryValueType =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | null
  | undefined;
type ParamInput = Record<string, QueryValueType> | URLSearchParams;
type SingleInput = [string, QueryValueType];
type OptionsType = {
  mode?: "default" | "replace" | "append" | "delete" | "reset";
};

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const addOrDeleteParam = useCallback(
    (
      params: URLSearchParams,
      key: string,
      value: QueryValueType,
      append = false
    ) => {
      if (!value) {
        params.delete(key);
      } else {
        const newValues = Array.isArray(value) ? value : [String(value)];

        if (append && params.has(key)) {
          const existingValues =
            params.get(key)?.split(",").filter(Boolean) || [];
          const values = [...new Set([...existingValues, ...newValues])];
          params.set(key, values.join(","));
        } else {
          params.set(key, newValues.join(","));
        }
      }
    },
    []
  );

  const mutateQueryParams = useCallback(
    (input: ParamInput | SingleInput, options: OptionsType = {}) => {
      const { mode = "default" } = options;
      const params =
        mode === "replace"
          ? new URLSearchParams()
          : new URLSearchParams(searchParams.toString());

      if (mode === "delete") {
        if (Array.isArray(input)) {
          params.delete(input[0]);
        } else {
          Object.keys(input).forEach((key) => params.delete(key));
        }
      } else if (mode === "reset") {
        router.push(pathname);
        return;
      } else {
        const append = mode === "append";

        if (Array.isArray(input)) {
          const [key, value] = input;
          addOrDeleteParam(params, key, value, append);
        } else if (input instanceof URLSearchParams) {
          input.forEach((value, key) =>
            addOrDeleteParam(params, key, value, append)
          );
        } else {
          Object.entries(input).forEach(([key, value]) =>
            addOrDeleteParam(params, key, value, append)
          );
        }
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, searchParams, pathname, addOrDeleteParam]
  );

  return { mutateQueryParams };
};
