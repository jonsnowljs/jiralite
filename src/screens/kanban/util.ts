import { useLocation } from "react-router";
import { useProject } from "utils/project";

/**
 * return current project id in the url
 *
 * @returns the id number of projects in the url
 */
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

/**
 * return the project object in current url
 * @returns current project object in the url
 */
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

/**
 *
 * @returns
 */
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
