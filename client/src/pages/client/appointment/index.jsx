import "./style.css"
import { Button, Form, Input, InputNumber, Image, Upload, Radio, Alert } from "antd";
import { useSelector } from "react-redux";
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import FormItem from "antd/es/form/FormItem";

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

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const serverURL = import.meta.env.VITE_SERVER_URL

function Appointment() {
  //upload file
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const handlePreview = file =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!file.url && !file.preview) {
        file.preview = yield getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    });
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = async (values) => {
    // Tạo FormData để gửi cả dữ liệu text & file
    const formData = new FormData();

    // Thêm thông tin bệnh nhân vào FormData
    formData.append("doctor_id", doctor._id);
    formData.append("client_id", userAccount._id);
    formData.append("client_age", values.age);
    formData.append("client_gender", values.gender);
    formData.append("spec", appointmentData.spec);
    formData.append("date", appointmentData.date);
    formData.append("time", appointmentData.time);
    formData.append("reason", values.reason);
    formData.append("scheduleId", appointmentData.scheduleId);

    // Thêm ảnh vào FormData
    fileList.forEach((file, index) => {
      formData.append(`images`, file.originFileObj);
    });

    const response = await fetch(`${serverURL}/api/doctor/appointment/create/${doctor._id}`, {
      method: "POST",
      body: formData,
      credentials: "include"
    })
    const result = await response.json();
    if (result.status === 200) {
      const roomRes = await fetch(`${serverURL}/api/chat/createRoom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          doctorId: doctor._id,
          clientId: userAccount._id
        }),
        credentials: "include"
      });
    
      const roomResult = await roomRes.json();
      console.log("Room result:", roomResult);

      const alert = document.querySelector(".alert");
      alert.classList.remove("hidden");
    }
  };


  const appointmentData = useSelector(state => state.appointmentReducer);
  const userAccount = useSelector(state => state.accountReducer);
  // console.log(userAccount);
  console.log(appointmentData);
  const doctor = appointmentData.doctor;
  return (
    <>
      <div className="appointment-view relative">
        <div className="appointment-heading">
          <h1>Complete your booking</h1>
          <div className="alert absolute -right-0 hidden">
            <Alert
              message="Success"
              description="You have booked successful!"
              type="success"
              showIcon
              closable
            />
          </div>
        </div>
        <div className="appointment-card-wrap">
          <div className="card-body">
            <article className="appointment-card-info-wrap">
              <div className="card-img">
                <img src={doctor.avatar} alt={doctor.fullName} />
              </div>
              <div className="appointment-card-content">
                <div className="prov-name-wrap">
                  <h2>
                    <a className="prov-name" href="/">{doctor.fullName}</a>
                  </h2>
                </div>
                <div className="appointment-time">{`${appointmentData.day}, ${appointmentData.date} - ${appointmentData.time} ${appointmentData.time <= 12 ? "AM" : "PM"}`}</div>
                <div className="appointment-spec">{appointmentData.spec}</div>
              </div>
            </article>
          </div>
        </div>
        <div className="appointment-card-wrap">
          <h2>Patient information</h2>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={(values) => onFinish(values)}
            initialValues={
              {
                username: userAccount.fullName,
                email: userAccount.email,
                phone: userAccount.phone
              }
            }
          >
            <Form.Item
              name="username"
              label="Name"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                {
                  type: 'number',
                  min: 1,
                  max: 110,
                  required: true
                },
              ]}
              required
            >
              <InputNumber />
            </Form.Item>
            <FormItem
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Radio.Group
                options={[
                  {
                    value: "male",
                    label: "Male"
                  },
                  {
                    value: "female",
                    label: "Female"
                  }
                ]}
              ></Radio.Group>
            </FormItem>
            <Form.Item
              name="reason"
              label="Reason for examination"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <FormItem
              name="image"
              label="Symptom Images"
            >
              <div>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: visible => setPreviewOpen(visible),
                      afterOpenChange: visible => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </FormItem>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Appointment;