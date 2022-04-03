// '!0'is true, '!1' is false
// '!!'means get the boolean value of a value
export const isFalsy = (value) => (value === 0 ? false : !value);

// It's a bad design if your change the passed in object's value directly, it will change the original one as well
// This function will delete empty property from the passed in object
export const cleanObject = (object) => {
  // clone a new object and pass it the var result
  const result = { ...object };
  // Object.keys return an array of the keys
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // value might be 0, so we need the isFalsy function
    if (isFalsy(value)) {
      // delete removes a property from an object
      delete result[key];
    }
  });

  return result;
};
