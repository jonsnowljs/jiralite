import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+ New Task</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"What should be done"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </Card>
  );
};
