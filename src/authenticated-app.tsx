import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/AuthContext";
import { ProjectListScreen } from "screens/ProjectList";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { userInfo } from "os";
import { Outlet, Route, Router, Routes } from "react-router";

import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { useState } from "react";
import ProjectModal from "screens/ProjectList/ProjectModal";
import { ProjectPopover } from "components/ProjectPopover";
import { useProjectModal } from "screens/ProjectList/util";
import { BrowserRouter } from "react-router-dom";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<Layout />}>
              <Route index element={<ProjectListScreen />} />
              <Route path={":projectId/*"} element={<ProjectScreen />} />
            </Route>

            {/* <Route path="*" element={"/projects"} /> */}
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  );
};

const Layout = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
      <ProjectModal />
    </>
  );
};

// one dimension layout use flex, two dimension use grid.

const PageHeader = () => {
  return (
    <>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <ButtonNoPadding
            style={{ padding: 0 }}
            type={"link"}
            onClick={resetRoute}
          >
            <SoftwareLogo width={"4rem"} color={"rgb(38, 132, 255)"} />
          </ButtonNoPadding>
          <ProjectPopover />
          <span>User</span>
        </HeaderLeft>
        <HeaderRight>
          <User />
        </HeaderRight>
      </Header>
    </>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
