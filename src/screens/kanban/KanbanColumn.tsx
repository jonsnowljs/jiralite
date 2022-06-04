import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/TaskType";
import { useTasksSearchParams } from "./util";
import { ReactComponent as TaskIcon } from "assets/task.svg";
import { ReactComponent as BugIcon } from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }

  if (name === "task") {
    return <TaskIcon />;
  } else {
    return <BugIcon />;
  }
};
/**
 *
 * @param kanban object
 * @returns
 */
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  // useTasksSearchParams()
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  console.log(useTasksSearchParams());
  console.log("allTasks", allTasks);
  console.log("tasks", tasks);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {console.log("tasks", tasks)}
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TaskContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
