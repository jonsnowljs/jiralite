import React from "react";
import { useTaskTypes } from "utils/TaskType";
import { useUsers } from "utils/user";
import { IdSelect } from "./IdSelect";

export const TaskTypSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
