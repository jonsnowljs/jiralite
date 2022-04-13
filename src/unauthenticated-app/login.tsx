import { useAuth } from "context/AuthContext";
import React from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
const apiurl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { login, user } = useAuth();

  // HTMLFormElement extends Element
  // Interface Oriented: duck typing. As long as the field in the interface are same. Typescript would have compile error
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
        <LongButton htmlType={"submit"} type={"primary"}>
          Logi
        </LongButton>
      </Form.Item>
    </Form>
  );
};
