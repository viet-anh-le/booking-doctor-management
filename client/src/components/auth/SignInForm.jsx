import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import { Form, Input, Checkbox, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { fetchAccountData } from "../../actions/account";
import { useDispatch } from "react-redux";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const handleFinish = (values) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          remember: values.checked
        }),
        credentials: "include"
      })
      const result = await response.json();
      console.log(result);
      if (result.message === "SUCCESS") {
        const response1 = await fetch(`${serverURL}/api/admin/admin-accounts/${values.email}`, {
          method: "GET",
          credentials: "include"
        })
        const result1 = await response1.json();
        console.log(result1);
        dispatch(fetchAccountData(result1));
        navigate("/admin");
      }
    }
    fetchApi();
  }
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <Form
              layout="vertical"
              onFinish={handleFinish}
            >
              <div className="space-y-6">
                <div>
                  <Form.Item label="Email" name="email">
                    <Input
                      placeholder="info@gmail.com"
                      style={{ minHeight: "40px" }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Password" name="password">
                    <>
                    </>
                    <Input.Password
                      placeholder="Enter your password"
                      style={{ minHeight: "40px" }}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Form.Item name="checked" valuePropName="checked">
                      <Checkbox onChange={(e) => setIsChecked(e.target.checked)}>Keep me logged in</Checkbox>
                    </Form.Item>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button
                    className="w-full"
                    style={{ minHeight: "40px" }}
                    htmlType="submit"
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
