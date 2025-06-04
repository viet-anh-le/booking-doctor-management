import { Button, Form, Input, DatePicker, Select, Upload, Row, Col, Alert } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

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

export default function DoctorDetail() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const doctorId = useParams().doctorId;
  const [selectedDoctor, setSelectedDoctor] = useState(undefined);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts/doctorDetail/${doctorId}`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      console.log(result);
      setSelectedDoctor(result);

      if (result.avatar) {
        setFileList([{
          uid: '-1',
          name: 'avatar.jpg',
          status: 'done',
          url: result.avatar
        }]);
      }
    }
    fetchApi();
  }, []);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
      <Button type="link" onClick={() => navigate(-1)}> <ArrowLeftOutlined /> </Button>
      <div className="alert absolute -right-0 hidden z-100">
        <Alert
          message="Success"
          description="You have created account successful!"
          type="success"
          showIcon
          closable
        />
      </div>
      {
        selectedDoctor &&
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
          style={{ maxWidth: 1000, margin: "auto" }}
          initialValues={{
            name: selectedDoctor.fullName,
            dob: dayjs(selectedDoctor.dob),
            cccd: selectedDoctor.cccd,
            address: selectedDoctor.address,
            department: selectedDoctor.specialization,
            phone: selectedDoctor.phone,
            email: selectedDoctor.email
          }}
        >
          <Form.Item label="Doctor Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} readOnly/>
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Date of birth" name="dob" rules={[{ required: true, message: 'Please input!' }]}>
                <DatePicker style={{ minHeight: 40, minWidth: 300 }} disabled/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Identification" name="cccd" rules={[{ required: true, message: 'Please input!' }]}>
                <Input style={{ minHeight: 40 }} readOnly/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} readOnly/>
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Select
              style={{ minHeight: 40 }}
              mode="multiple"
              disabled
            />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} readOnly/>
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} readOnly/>
          </Form.Item>

          <Form.Item label="Avatar">
          <Upload
            fileList={fileList}
            listType="picture-card"
            onChange={({ fileList: newFileList }) => {
              setFileList(newFileList.slice(-1));
            }}
            beforeUpload={() => {
              return false;
            }}
            disabled={true}
          >
            {null}
          </Upload>
        </Form.Item>
        </Form>
      }
    </div>
  );
}
