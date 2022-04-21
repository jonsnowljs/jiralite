import React, { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Typography } from "antd";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";

const apiurl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("Project List", false);
  // const [, setParam] = useState({ name: "", personId: "" });

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  console.log(useUrlQueryParam(["name"]));
  const test = useUrlQueryParam(["name"]);

  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
