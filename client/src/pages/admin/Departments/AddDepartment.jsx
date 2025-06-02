import {
  Button,
  Form,
  Input,
  Alert,
} from 'antd';
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const { TextArea } = Input;

const serverURL = import.meta.env.VITE_SERVER_URL;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export default function AddDepartment() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const hospitalId = useParams().hospitalId;
  const handleFinish = (values) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/department/create/${hospitalId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: "include"
      });
      const result = await response.json();
      console.log(result);

      const alert = document.querySelector(".alert");
      alert.classList.remove("hidden");
    }
    fetchApi();
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
      <Button type="link" onClick={() => navigate(-1)}> <ArrowLeftOutlined /> </Button>
      <div className="alert absolute -right-0 hidden z-100">
        <Alert
          message="Success"
          description="You have created hospital successful!"
          type="success"
          showIcon
          closable
        />
      </div>
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, margin: "auto" }}
        onFinish={handleFinish}
      >
        <Form.Item label="Department Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
          <Input style={{ minHeight: 40 }} />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input!' }]}>
          <TextArea rows={4}  style={{ minHeight: 80 }} />
        </Form.Item>
        <Form.Item label="Phone number" name="phone" rules={[{ required: true, message: 'Please input!' }]}>
          <Input style={{ minHeight: 40 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
