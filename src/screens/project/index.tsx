import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import EpicScreen from "screens/Epic";
import KanbanScreen from "screens/kanban";
const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/* if to={"/Kanban"}, it / wil make it be root router */}
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Epic</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        {/* <Route path="*" element={<KanbanScreen />} /> */}
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
