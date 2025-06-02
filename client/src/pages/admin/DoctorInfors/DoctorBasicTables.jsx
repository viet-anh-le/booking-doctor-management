import { Space, Table, Tag, List } from 'antd';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
const serverURL = import.meta.env.VITE_SERVER_URL;
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
      <Space size="middle">
        <a><EyeOutlined /></a>
        <a><EditOutlined /></a>
        <a><DeleteOutlined /></a>
      </Space>
    ),
  },
];
function DoctorBasicTables() {
  const [doctorData, setDoctorData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts/`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      setDoctorData(result);
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