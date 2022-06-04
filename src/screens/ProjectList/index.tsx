import React, { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Button, Typography } from "antd";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

const apiurl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("Project List", false);
  // const [, setParam] = useState({ name: "", personId: "" });

  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  const test = useUrlQueryParam(["name"]);

  return (
    <Container>
      <Row between={true}>
        <h1>Project List</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          New Project
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
