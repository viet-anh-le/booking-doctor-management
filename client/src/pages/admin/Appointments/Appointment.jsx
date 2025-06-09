import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { Space, Table, Tag, List } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

function AppointmentLog() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/appointment-log`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      console.log(result);
      setData(
        result.map(item => ({
          ...item,
          key: item._id
        }))
      );
    }
    fetchApi();
  }, [])
  const columns = [
    {
      title: 'Appointment ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Doctor name',
      dataIndex: 'doctor_name',
      key: 'doctor_name',
    },
    {
      title: 'Client name',
      dataIndex: 'client_name',
      key: 'client_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link to={`${record._id}`} state={{ record }}><EyeOutlined /></Link>
      ),
    },
  ];
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Appointment Informations">
          <Table columns={columns} dataSource={data}/>
        </ComponentCard>
      </div>
    </>
  )
}

export default AppointmentLog;