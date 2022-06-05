import { Input } from "antd";
import React, { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { useAddConfig } from "utils/useOptimisticOptions";
import { ColumnsContainer } from ".";
import { Container } from "./KanbanColumn";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"Create New Kanban"}
        onPressEnter={submit}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </Container>
  );
};
