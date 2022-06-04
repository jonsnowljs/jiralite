import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypSelect } from "components/TaskTypeSelect";
import UserSelect from "components/UserSelect";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={3} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"Task Name "}
        value={searchParams.name}
        onChange={(event) => setSearchParams({ name: event.target.value })}
      />
      <UserSelect
        defaultOptionName={"Assignee"}
        value={searchParams.processId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypSelect
        defaultOptionName={"Type"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>Clear Filter</Button>
    </Row>
  );
};
