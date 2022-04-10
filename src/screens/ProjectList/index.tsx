import React, { useState, useEffect } from "react";
import * as qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import { useHttp } from "utils/http";

const apiurl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const debouncedParam = useDebounce(param, 500);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
