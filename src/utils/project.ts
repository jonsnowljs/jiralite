import { useCallback, useEffect } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/Project";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useProjectsSearchParams } from "../screens/ProjectList/util";
import { useAddConfig, useEditConfig } from "./useOptimisticOptions";

/**
 * Request all projects
 * @param param - interface `Project`
 * @returns {useQueryResult} use
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

/**
 * Edit projects
 * @returns
 */
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

/**
 * Return project object based on the provided id
 * @param id id of the project
 * @returns usequery result
 */
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    { enabled: !!id }
  );
};
