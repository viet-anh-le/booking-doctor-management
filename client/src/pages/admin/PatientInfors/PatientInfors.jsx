import { Space, Table, Tag } from 'antd';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { useEffect, useState } from 'react';
import { DeleteOutlined } from "@ant-design/icons";
const serverURL = import.meta.env.VITE_SERVER_URL;
function PatientInfors() {
  
  const handleDelete = (id) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/patient-accounts/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({deleted: true}),
        credentials: "include"
      });
      const result = await response.json();
      if (result.status === 200){
        setData(prev =>
          prev.map(patient => patient._id === id ? { ...patient, deleted: true } : patient)
        );
      }
    }
    fetchApi();
  }
  const columns = [
    {
      title: 'Patient ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Patient name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'BHYT',
      dataIndex: 'bhyt',
      key: 'bhyt',
    },
    {
      title: 'Number of profiles',
      dataIndex: 'profilesLen',
      key: 'profilesLen',
    },
    {
      title: 'Total appointments',
      dataIndex: 'totalAppointments',
      key: 'totalAppointments',
    },
    {
      title: 'Today appointments',
      dataIndex: 'todayAppointments',
      key: 'todayAppointments',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => (
        <>
          <Tag color={record.deleted ? "red" : "green"} key={record.name}>
            {record.deleted ? "Deleted" : "Active"}
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        !record.deleted &&
        <Space size="middle">
          <a onClick={() => handleDelete(record._id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/patient-accounts`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      const tempData = result.map((item) => (
        {
          ...item,
          key: item._id
        }
      ))
      setData(tempData);
    }
    fetchApi();
  }, [])
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Patient Informations">
          <Table columns={columns} dataSource={data} />
        </ComponentCard>
      </div>
    </>
  )
}

export default PatientInfors;