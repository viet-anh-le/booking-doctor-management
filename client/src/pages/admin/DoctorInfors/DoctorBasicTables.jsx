import { Space, Table, Tag, List } from 'antd';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useLocation } from 'react-router-dom';
const serverURL = import.meta.env.VITE_SERVER_URL;
function DoctorBasicTables() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const department = query.get("department");
  const params = new URLSearchParams();
  if (department) params.append('department', department);
  const handleDelete = (doctorId) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts/doctorDelete/${doctorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({deleted: true}),
        credentials: "include"
      });
      const result = await response.json();
      if (result.status === 200){
        setDoctorData(prev =>
          prev.map(doc => doc._id === doctorId ? { ...doc, deleted: true } : doc)
        );
      }
    }
    fetchApi();
  }
  const columns = [
    {
      title: 'Doctor',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => (
        <div className="px-5 py-4 sm:px-6 text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                width={40}
                height={40}
                src={record.avatar}
                alt={record.fullName}
              />
            </div>
            <div>
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {record.fullName}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Department',
      dataIndex: 'specialization',
      key: 'specializtion',
      render: (_, record) => (
        <List
          size="small"
          dataSource={record.specialization}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      )
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
          <Link to={`/admin/doctorDetail/${record._id}`}><EyeOutlined /></Link>
          <Link to={`/admin/edit-doctor/${record._id}`}><EditOutlined /></Link>
          <a onClick={() => handleDelete(record._id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];
  const [doctorData, setDoctorData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts?${params.toString()}`, {
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
      setDoctorData(tempData);
    }
    fetchApi();
  }, [])
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Doctor Informations" button="Add Doctor">
          <Table columns={columns} dataSource={doctorData} />
        </ComponentCard>
      </div>
    </>
  )
}

export default DoctorBasicTables;