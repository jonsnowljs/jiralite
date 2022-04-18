import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import BoardScreen from "screens/Board";
import EpicScreen from "screens/Epic";
const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/* if to={"/Board"}, it / wil make it be root router */}
      <Link to={"Board"}>Board</Link>
      <Link to={"epic"}>Epic</Link>
      <Routes>
        <Route path={"/board"} element={<BoardScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Route path="*" element={<BoardScreen />} />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
