import styled from "@emotion/styled";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import KanbanColumn from "./KanbanColumn";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name} Kanban</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
