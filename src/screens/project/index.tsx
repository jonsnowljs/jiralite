import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import EpicScreen from "screens/Epic";
import { KanbanScreen } from "screens/kanban";
const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Epic</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Route path="*" element={<KanbanScreen />} />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
