import { useAuth } from "context/AuthContext";
import React from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";
import { useDispatch } from "react-redux";
const apiurl = process.env.REACT_APP_API_URL;

// { onError }: { onError: (error: Error) => void } is the syntax for destructuring.
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const dispatch = useDispatch();

  // HTMLFormElement extends Element
  // Interface Oriented: duck typing. As long as the field in the interface are same. Typescript would have compile error
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    dispatch(loginThunk(values));
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "Please input you username" }]}
      >
        <Input placeholder={"Username"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please input you password" }]}
      >
        <Input placeholder={"Password"} type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          Login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
