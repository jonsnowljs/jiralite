import { Button, Drawer } from "antd";
import React from "react";

const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      width={"100%"}
      visible={props.projectModalOpen}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>Close</Button>
    </Drawer>
  );
};

export default ProjectModal;
