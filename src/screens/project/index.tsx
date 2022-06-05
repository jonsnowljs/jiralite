import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import EpicScreen from "screens/Epic";
import { KanbanScreen } from "screens/kanban";
import { ScreenContainer } from "components/lib";
import styled from "@emotion/styled";
import { Menu } from "antd";

/**
 * check what's the router in the end is epic or kanban, used to maintain the menu selected after refresh
 * @returns  kanban or epic in route
 */
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  console.log(routeType);
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>Kanban</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>Epic</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          <Route path="*" element={<KanbanScreen />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
