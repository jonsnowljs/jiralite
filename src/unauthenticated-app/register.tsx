import { Button, Form, Input } from "antd";
import { useAuth } from "context/AuthContext";
import React from "react";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";

const apiurl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  // Interface Oriented: duck typing. As long as the field in the interface are same. Typescript would have compile error
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("Please make sure your passwords match "));
      return;
    }
    try {
      await run(register(values));
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "Please confirm you password" }]}
      >
        <Input
          placeholder={"Confirm Password"}
          type="password"
          id="cpassword"
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
