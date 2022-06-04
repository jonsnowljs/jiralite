import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban Lists");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const aa = useKanbans();
  return (
    <ScreenContainer>
      <h1>{currentProject?.name} Kanban</h1>
      <SearchPanel />
      <ColumnsContainer>
        {console.log(useKanbanSearchParams())}
        {console.log(kanbans)}
        {console.log(aa)}
        {console.log()}
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
