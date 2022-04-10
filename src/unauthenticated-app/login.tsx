import { useAuth } from "context/AuthContext";
import React from "react";

const apiurl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { login, user } = useAuth();

  // HTMLFormElement extends Element
  // Interface Oriented: duck typing. As long as the field in the interface are same. Typescript would have compile error
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // event.currentTarget.elements[0] is element type, but it don't have value property, so we need cast HTMLInputElement type to it
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="username">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
