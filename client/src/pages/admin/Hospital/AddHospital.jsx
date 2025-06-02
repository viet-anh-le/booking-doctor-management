import {
  Button,
  Form,
  Input,
  Alert,
  Select,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

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

export default function AddHospital() {
  const [form] = Form.useForm();
  const [allProvinces, setAllProvinces] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://provinces.open-api.vn/api?depth=2`,
        {
          method: "GET"
        }
      );
      const result = await response.json();
      setAllProvinces(result);
      const tempProvinces = result.map(item => (
        {
          label: item.name,
          value: item.name
        }
      ));
      setProvinces(tempProvinces);
    };
    fetchApi();
  }, []);
  const navigate = useNavigate();

  const handleChange = (value) => {
    const selectedProvince = allProvinces.find(item => item.name === value);
    if (selectedProvince && selectedProvince.districts) {
      const tempDistricts = selectedProvince.districts.map(district => (
        {
          label: district.name,
          value: district.name
        }
      ));
      setDistricts(tempDistricts);
      form.setFieldsValue({ district: undefined }); // Reset district field
    } else {
      setDistricts([]);
    }
  }

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append('province', values.province);
    formData.append('district', values.district);
    formData.append('name', values.name);
    formData.append('type', 'hospital');
    fileList.forEach((file, index) => {
      formData.append(`logo`, file.originFileObj);
    });

    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/hospital/create`, {
        method: "POST",
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
      <div className="alert absolute -right-0 hidden">
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
        <Form.Item label="Address" style={{ marginBottom: 0 }}>
          <Form.Item
            name="province"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(40% - 10px)', marginRight: 10 }}
          >
            <Select placeholder="Province" options={provinces} onChange={(value) => handleChange(value)} />
          </Form.Item>
          <Form.Item
            name="district"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 10px)', margin: '0 8px' }}
          >
            <Select placeholder="District" options={districts} />
          </Form.Item>
        </Form.Item><Form.Item label="Hospital Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
          <Input style={{ minHeight: 40 }} />
        </Form.Item>
        <Form.Item label="Logo">
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
                <div style={{ marginTop: 8 }}>Logo</div>
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
    </div>
  );
}
