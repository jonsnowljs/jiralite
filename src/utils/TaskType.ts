import { useQuery } from "react-query";
import { Task } from "types/task";
import { TaskType } from "types/TaskType";
import { useHttp } from "./http";

export const useTaskTypes = () => {
  const client = useHttp();

  // if in certain time it have several same querykey send request, react query will combine all those request and only send one. the time can be set.
  return useQuery<TaskType[]>(["taskTypes"], () => client("tasksTypes"));
};
