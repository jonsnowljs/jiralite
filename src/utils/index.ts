import { useEffect, useRef, useState } from "react";
// '!0'is true, '!1' is false
// '!!'means get the boolean value of a value
// compare to any , unkown type can be any value like any, but when you use it call some method, it will have more restriction
export const isFalsy: (value: unknown) => boolean = (value) =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// It's a bad design if your change the passed in object's value directly, it will change the original one as well
// This function will delete empty property from the passed in object
export const cleanObject = (object: { [key: string]: unknown }) => {
  // clone a new object and pass it the var result
  const result = { ...object };
  // Object.keys return an array of the keys
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // value might be 0, so we need the isFalsy function
    if (isVoid(value)) {
      // delete removes a property from an object
      delete result[key];
    }
  });

  return result;
};

// Custom hook: execute callback function when the page first mount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// Custom hook: prevent the function running several times before executing.
// TS: `?:` means it's optional
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // when value change we set up an timeout for it
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // after the execution of previous useEffect. the return function will execute
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// generic type practice
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  // When page loading: old title === 'React App'
  // After loading: oldTitle === new title
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // if no dependency is added oldTitle will be loaded
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// reset routes to root, make it go back to homepage
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * used to return the mounted status of component,
 * @return boolean. if unmounted or haven't mounted yet return false. if mounted return true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
