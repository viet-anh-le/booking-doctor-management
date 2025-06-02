import { Space, Table, Tag } from 'antd';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
const serverURL = import.meta.env.VITE_SERVER_URL;
const columns = [
  {
    title: 'Service',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'ppu',
    key: 'ppu',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, record) => (
      <>
        <Tag color="green" key={record.name}>
          Active
        </Tag>
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function Services() {
  const departmentId = useParams().departmentId;
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/service/${departmentId}`,
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
      setServices(tempData);
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Service Informations" button="Add Service" id={departmentId}>
          <Table columns={columns} dataSource={services} />
        </ComponentCard>
      </div>
    </>
  )
}

export default Services;