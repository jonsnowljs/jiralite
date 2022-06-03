import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // if in certain time it have several same querykey send request, react query will combine all those request and only send one. the time can be set.
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
