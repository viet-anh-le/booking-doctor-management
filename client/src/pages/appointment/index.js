import "./style.css"
import { Button, Form, Input, InputNumber } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const onFinish = (values) => {
  console.log(values);
};

function Appointment() {
  return (
    <>
      <div className="appointment-view">
        <div className="appointment-heading">
          <h1>Complete your booking</h1>
        </div>
        <div className="appointment-card-wrap">
          <div className="card-body">
            <article className="appointment-card-info-wrap">
              <div className="card-img">
                <img src="https://img.lb.wbmdstatic.com/lhd/provider_prod/1874343_31e598c6-86e5-45bf-ae4b-915a1d51b13b.jpg" alt="Dr. Aleksandr  Kovalskiy - Beverly Hills, CA - Family Medicine" />
              </div>
              <div className="appointment-card-content">
                <div className="prov-name-wrap">
                  <h2>
                    <a className="prov-name" href="/">Dr. Aleksandr  Kovalskiy, MD</a>
                  </h2>
                </div>
                <div className="appointment-time">Monday, Mar 10, 2025 - 9h30 PM</div>
                <div className="appointment-spec">Primary care</div>
              </div>
            </article>
          </div>
        </div>
        <div className="appointment-card-wrap">
          <h2>Patient information</h2>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            initialValues={
              {
                username: "Nguyễn Văn A",
                email: "anguyen@gmail.com",
                phone:  "0987654321",
                age: 18,
                reason: "Lorem..."
              }
            }
          >
            <Form.Item
              name="username"
              label="Name"
            >
              <Input />
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
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                {
                  type: 'number',
                  min: 1,
                  max: 110
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item name="reason" label="Reason for examination">
              <Input.TextArea />
            </Form.Item>
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