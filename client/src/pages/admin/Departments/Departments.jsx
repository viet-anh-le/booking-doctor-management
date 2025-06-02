import { Space, Table, Tag } from 'antd';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const serverURL = import.meta.env.VITE_SERVER_URL;
const columns = [
  {
    title: 'Department',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    width: '40%',
    tooltip: true
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, record) => {
      if (record.deleted) {
        return <Tag color="red">Deleted</Tag>;
      }
      return <Tag color="green">Active</Tag>;
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`services`}>View</Link>
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function Departments() {
  const { hospitalId } = useParams();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/department/${hospitalId}`,
        {
          method: "GET",
          credential: "include",
        }
      );
      const result = await response.json();
      const tempData = result.data.map(item => ({
        ...item,
        key: item._id,
      }));
      setDepartments(tempData);
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Departments Informations" button="Add Department" id={hospitalId}>
          <Table columns={columns} dataSource={departments} />
        </ComponentCard>
      </div>
    </>
  )
}

export default Departments;