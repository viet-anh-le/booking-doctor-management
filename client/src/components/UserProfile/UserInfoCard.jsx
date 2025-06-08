
import { Editor } from 'primereact/editor';
import { Button, Input, Form, Modal, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctorAccountData } from "../../actions/doctor_account";

const serverURL = import.meta.env.VITE_SERVER_URL;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function UserInfoCard({ userRole }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [account, setAccount] = useState(undefined);
  const doctorAccount = useSelector(state => state.doctorAccountReducer);
  const userAccount = useSelector(state => state.accountReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    if (userRole === "client") setAccount(userAccount);
    else if (userRole === "doctor") {
      setAccount(doctorAccount);
      setText(doctorAccount.description);
    }
    else if (userRole === "admin") {
      setAccount(userAccount);
    }
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const values = await form.validateFields();
      const { password, ...updatedValues } = values;
      console.log(values);
      const fetchApi = async () => {
        const response = await fetch(`${serverURL}/api/${userRole}/auth/edit/${account._id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(values),
          credentials: "include"
        })
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
          dispatch(fetchDoctorAccountData({
            ...account,
            ...updatedValues
          }));
          setAccount(prev => ({
            ...prev,
            ...values,
            password: undefined
          }));
        }
      }
      fetchApi();
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    account &&
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {account.fullName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {account.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                +{account.phone}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Identification
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {account.cccd}
              </p>
            </div>
          </div>
          {userRole === "doctor" &&
            <div className="mt-7 w-[100%]">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Bio
              </p>
              <Editor
                value={account.description}
                style={{ height: '320px' }}
                readOnly
              />
            </div>}
        </div>

        <button
          onClick={showModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal
        title={`Personal Information`}
        open={isModalOpen}
        onOk={handleOk}
        okText="Save changes"
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          form={form}
          {...layout}
          layout="vertical"
          labelAlign="left"
          colon={false}
          style={{ maxWidth: 800 }}
          initialValues={{
            fullName: account.fullName,
            email: account.email,
            phone: account.phone,
            cccd: account.cccd,
            description: account.description
          }}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                <Input style={{ minHeight: 40 }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input style={{ minHeight: 40 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                <Input style={{ minHeight: 40 }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Identification" name="cccd" rules={[{ required: true }]}>
                <Input style={{ minHeight: 40 }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: changePassword, message: 'Please input!' }]} style={{ display: 'inline-block', width: 'calc(80% - 8px)', marginRight: 8 }}>
              <Input style={{ minHeight: 40 }} disabled={!changePassword} />
            </Form.Item>
            <Form.Item label=" " style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}>
              {!changePassword &&
                <Button
                  type="primary"
                  style={{ minHeight: 40 }}
                  onClick={() => setChangePassword(!changePassword)}
                >
                  Change Password
                </Button>
              }
            </Form.Item>
          </Form.Item>

          {userRole === "doctor" &&
            <Form.Item
              label="Bio"
              name="description"
              wrapperCol={24}
            >
              <Editor
                value={text}
                onTextChange={(e) => {
                  setText(e.htmlValue);
                  form.setFieldsValue({ description: e.htmlValue });
                }}
                style={{ height: '320px' }}
              />
            </Form.Item>
          }
        </Form>
      </Modal>
    </div>
  );
}
