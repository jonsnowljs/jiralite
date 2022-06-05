import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig, useEditConfig } from "./useOptimisticOptions";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // if in certain time it have several same querykey send request, react query will combine all those request and only send one. the time can be set.
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

/**
 * Add new task
 *
 * @param queryKey react query's queryKey
 * @returns
 */
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
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
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

/**
 * Edit specific task
 * @returns
 */
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};
