import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useAddConfig } from "./useOptimisticOptions";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

/**
 * Add new kanban
 *
 * @param queryKey react query's queryKey
 * @returns
 */
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
