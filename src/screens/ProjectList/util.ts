import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

//  param for project list search
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};
