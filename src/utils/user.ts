import { useEffect } from "react";
import { User } from "screens/ProjectList/SearchPanel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
