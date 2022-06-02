import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * return the specified parameter's value in the url
 * used as state management
 * @param keys list of key in url param
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // useSearchParams hook is used to read and modify the query string in the URL for the current location.
  // https://reactrouter.com/docs/en/v6/hooks/use-search-params
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      //^ { [key in K]: string } is mapped types, it's like a map function for type, loop through all types in K to create a type {key1: string, key2: string}
      // {[key: string]: string} is index signature. It is used when you only know the key and value types, but don't know what the key is.
      // e.g. {book: 12, salary: 15} and {pay: 15}, you only know the key is string, value is number but don't what the key is.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),

    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
  //^ as const is const assertion. It tells the compiler to infer the narrowest type it can for an expression.
  // e.g. cont args = [3,5]; typescript default inference will infers the type of number[]. it means an array of  0 or more elements of type number
  // compiler don't know how many elements there.  const args=[3, 5] as const will be inferred as a readonly tuple with length 2 with 3, 5 as value.
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
