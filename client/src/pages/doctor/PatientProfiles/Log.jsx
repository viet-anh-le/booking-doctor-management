import { DatePicker } from 'antd';
import { Button, Form, Table, Space, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

const serverURL = import.meta.env.VITE_SERVER_URL;

function PatientLog() {
  const client_id = useParams().id;
  const [reload, setReload] = useState(false);
  const handleClick = (record) => {
    console.log(record);
  }
  const handleDelete = async (record) => {
    const appId = record.appointmentId;
    const response = await fetch(`${serverURL}/api/doctor/appointment/edit/${appId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: "reject", deleted: true }),
    })
    const result = await response.json();
    if (result.status === 200) {
      setReload(!reload);
    }
  }
  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Tag',
      key: 'tag',
      dataIndex: 'tag',
      render: (tag, _, index) => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        return (
          <Tag color={color} key={index}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/doctor/appointment/detail/${record.appointmentId}`} onClick={() => handleClick(record)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </Link>
          <a onClick={() => handleDelete(record)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </a>
        </Space>
      )
    },
  ];
  const [form] = Form.useForm();
  const doctorAccount = useSelector(state => state.doctorAccountReducer);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/appointment/${doctorAccount._id}`);
      const result = await response.json();
      const newArr = result.filter(item => item.appointment.client_id === client_id).map((appointment, index) => {
        const app = appointment.appointment;
        const date = dayjs(app.date).format("DD/MM/YYYY");
        const time = `${app.time} ${date}`;
        const gender = app.client_gender.charAt(0).toUpperCase() + app.client_gender.slice(1);
        const tag = app.spec;
        return {
          key: index,
          time: time,
          name: appointment.client_name,
          age: app.client_age,
          gender: gender,
          tag: tag,
          status: app.status,
          appointmentId: app._id
        }
      })
      setAppointments(newArr);
    }
    fetchApi();
  }, [reload])

  return (
    <>
      <div className="list-appointment-content p-5">
        <div className="title mb-4">
          <h1 className="text-xl">List of appointments</h1>
        </div>
        <div className="appointment-content bg-white shadow-sm">
          <div className="appointment-header p-5 bg-gray-50">
            <Form
              layout="inline"
              form={form}
            >
              <FormItem label="Time" layout='vertical'>
                <DatePicker style={{ width: "500px" }} />
              </FormItem>
              <FormItem label=" " layout='vertical'>
                <Button type='primary'>Search</Button>
              </FormItem>
            </Form>
          </div>
          <div className="appointment-body bg-white">
            <Table
              columns={columns}
              dataSource={appointments}
              rowClassName={(record) => {
                if (record.status === "pending") return "bg-yellow-100";
                if (record.status === "resolve") return "bg-green-100";
                if (record.status === "reject") return "bg-red-100";
                if (record.status === "fulfilled") return "bg-blue-100";
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default PatientLog;