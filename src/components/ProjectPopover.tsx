import { List, Popover } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";

const projectPopover = () => {
  const content = (
    <div>
      <Text type={"secondary"}>Favorites</Text>
      <List></List>
    </div>
  );
  return <Popover placement={"bottom"} content={content}></Popover>;
};

export default projectPopover;
