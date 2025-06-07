import { Button, Form, Input, DatePicker, Select, Upload, Row, Col, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHospitals, fetchClinics } from '../../../actions/admin_hospitals.js';
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

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
          resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const handlePreview = file =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!file.url && !file.preview) {
      file.preview = yield getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  });


export default function EditDoctor() {
  const [type, setType] = useState("hospital");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [optionsHospital, setOptionsHospital] = useState(useSelector(state => state.hospitalReducer));
  const [optionsClinic, setOptionsClinic] = useState(useSelector(state => state.clinicReducer));
  const dispatch = useDispatch();
  const [currentHospital, setCurrentHospital] = useState(null);
  const [optionsDepartment, setOptionsDepartment] = useState([]);
  const [selectedOptions, setSeletedOptions] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [selectedDoctor, setSelectedDocotr] = useState(undefined);
  const doctorId = useParams().doctorId;
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts/doctorDetail/${doctorId}`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      setSelectedDocotr(result);
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
  useEffect(() => {
    if (type == "clinic" && optionsClinic.length === 0) {
      const fetchApi = async () => {
        const response = await fetch(`${serverURL}/api/admin/hospital/${type}`, {
          method: "GET",
          credentials: "include"
        });
        const result = await response.json();
        const tempData = result.data.map(item => ({
          label: item.name,
          value: item._id
        }));
        dispatch(fetchClinics(result.data));
        setOptionsClinic(tempData);
      };
      fetchApi();
    }
    else if (type == "hospital" && optionsHospital.length === 0) {
      const fetchApi = async () => {
        const response = await fetch(`${serverURL}/api/admin/hospital/${type}`, {
          method: "GET",
          credentials: "include"
        });
        const result = await response.json();
        const tempData = result.data.map(item => ({
          label: item.name,
          value: item._id
        }));
        dispatch(fetchHospitals(result.data));
        setOptionsHospital(tempData);
      };
      fetchApi();
    }
    else {
      if (type === "hospital") {
        const tempData = optionsHospital.map(item => ({
          label: item.name,
          value: item._id
        }));
        setOptionsHospital(tempData);
      } else {
        const tempData = optionsClinic.map(item => ({
          label: item.name,
          value: item._id
        }));
        setOptionsClinic(tempData);
      }
    }
  }, [type]);
  useEffect(() => {
    if (!currentHospital) return;
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/department/${currentHospital}`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      const tempData = result.data.map(item => ({
        label: item.name,
        value: item._id
      }));
      setOptionsDepartment(tempData);
    }
    fetchApi();
  }, [currentHospital])
  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append('fullName', values.name);
    formData.append('email', values.email);
    formData.append('cccd', values.cccd);
    formData.append('phone', values.phone);
    formData.append('dob', values.dob);
    formData.append('address', currentHospital);
    const selectedLabel = selectedOptions.map(item => item.label);
    if (selectedLabel.length !== 0) formData.append('specialization', JSON.stringify(selectedLabel));
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('avatar', file.originFileObj);
      }
    });
    formData.append('status', "active");
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts/doctorEdit/${doctorId}`, {
        method: "PATCH",
        body: formData,
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
          description="You have updated account successful!"
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
          onFinish={handleFinish}
          initialValues={{
            name: selectedDoctor.fullName,
            dob: dayjs(selectedDoctor.dob),
            cccd: selectedDoctor.cccd,
            type: "hospital",
            hospital: selectedDoctor.address,
            department: selectedDoctor.specialization,
            phone: selectedDoctor.phone,
            email: selectedDoctor.email
          }}
        >
          <Form.Item label="Doctor Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Date of birth" name="dob" rules={[{ required: true, message: 'Please input!' }]}>
                <DatePicker style={{ minHeight: 40, minWidth: 300 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Identification" name="cccd" rules={[{ required: true, message: 'Please input!' }]}>
                <Input style={{ minHeight: 40 }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Address" rules={[{ required: true, message: 'Please input!' }]}>
            <Form.Item
              name="type"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(10%)', marginRight: 8 }}
            >
              <Select
                placeholder="Type"
                options={
                  [
                    { label: 'Hospital', value: 'hospital' },
                    { label: 'Clinic', value: 'clinic' }
                  ]
                }
                onChange={(value) => setType(value)}
                style={{ minHeight: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="hospital"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(90% - 8px)' }}
            >
              <Select
                placeholder={`Select ${type}`} style={{ minHeight: 40 }}
                options={type === "clinic" ? optionsClinic : optionsHospital}
                onChange={(value, option) => {
                  setCurrentHospital(value);
                }}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Select
              style={{ minHeight: 40 }}
              options={optionsDepartment}
              mode="multiple"
              onChange={(value, option) => setSeletedOptions(option)}
            />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} />
          </Form.Item>

          <Form.Item label="Avatar">
            <Upload
              fileList={fileList}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList.slice(-1));
              }}
              beforeUpload={() => {
                return false;
              }}
            >
              {fileList.length >= 1 ? null : (
                <button
                  style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Avatar</div>
                </button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      }
    </div>
  );
}
