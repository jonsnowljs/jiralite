import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/AuthContext";
import { ProjectListScreen } from "screens/ProjectList";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { userInfo } from "os";
import { Navigate, Route, Routes } from "react-router";

import ProjectScreen from "screens/project";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";
import { useState } from "react";
import ProjectModal from "screens/ProjectList/ProjectModal";
import { ProjectPopover } from "components/ProjectPopover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type={"link"}
          >
            New Project
          </ButtonNoPadding>
        }
      />

      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      onClick={() => setProjectModalOpen(true)}
                      type={"link"}
                    >
                      New Project
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path="*" element={<Navigate to={"/projects"} />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

// one dimension layout use flex, two dimension use grid.

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type={"link"}
          onClick={resetRoute}
        >
          <SoftwareLogo width={"4rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>User</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
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
