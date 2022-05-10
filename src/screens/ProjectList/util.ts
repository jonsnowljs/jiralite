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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // when return less than 3 use tuple, so you can name it whatever you want in same order, when more than 3 return object, so you can return in any order with the same name.
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
