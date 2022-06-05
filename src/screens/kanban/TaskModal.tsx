import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypSelect } from "components/TaskTypeSelect";
import UserSelect from "components/UserSelect";
import React, { useEffect } from "react";
import { useEditTask } from "utils/task";
import { useTasksModal, useTasksQueryKey } from "./util";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      okText={"Ok"}
      cancelText={"Cancel"}
      confirmLoading={editLoading}
      title={"Edit task"}
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"taskname"}
          name={"name"}
          rules={[{ required: true, message: "Please input the task name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"assignee"} name={"processorId"}>
          <UserSelect defaultOptionName={"Assignee"} />
        </Form.Item>
        <Form.Item label={"type"} name={"typeId"}>
          <TaskTypSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};
