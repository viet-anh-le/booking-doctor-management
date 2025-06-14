import { Button, Space, Table, Tag } from 'antd';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchClinics, fetchHospitals } from '../../../actions/admin_hospitals.js';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const serverURL = import.meta.env.VITE_SERVER_URL;

function Hospital() {
  const [toggle, setToggle] = useState(false);
  const [hospitalData, setHospitalData] = useState([]);
  const [clinicData, setClinicData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      const type = toggle ? "clinic" : "hospital";
      const response = await fetch(`${serverURL}/api/admin/hospital/${type}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      if (toggle) {
        const tempData = result.data.map(item => ({
          ...item,
          key: item._id
        }))
        setClinicData(tempData);
        dispatch(fetchClinics(tempData));
      }
      else {
        const tempData = result.data.map(item => ({
          ...item,
          key: item._id
        }))
        setHospitalData(tempData);
        dispatch(fetchHospitals(tempData));
      }
    };
    fetchApi();
  }, []);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleDelete = (id) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/hospital/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({deleted: true}),
        credentials: "include"
      });
      const result = await response.json();
      if (result.status === 200){
        setHospitalData(prev =>
          prev.map(hos => hos._id === id ? { ...hos, deleted: true } : hos)
        );
      }
    }
    fetchApi();
  }
  const columns = [
    {
      title: 'Hospital',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="px-5 py-4 sm:px-6 text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                width={40}
                height={40}
                src={record.logo}
                alt={record.name}
              />
            </div>
            <div>
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {record.name}
              </span>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {`${record.district}, ${record.province}`}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => {
        if (record.deleted) return <Tag color="red">Deleted</Tag>;
        return <Tag color="green">Active</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/departments/${record._id}`}>
            <Button color='primary' variant='outlined'>Departments</Button>
          </Link>
          <Link to={`/admin/doctor-infors?hospital=${record._id}`}>
            <Button color='primary' variant='outlined'>Doctors</Button>
          </Link>
          <Link to={`/admin/edit-hospital/${record._id}`} state={{record}}><EditOutlined /></Link>
          <a onClick={() => handleDelete(record._id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];
  return (
    <>
      {
        !toggle && (
          <div className="space-y-6">
            <ComponentCard title="Hospital Informations" button="Add Hospital" onToggle={handleToggle}>
              <Table columns={columns} dataSource={hospitalData} />
            </ComponentCard>
          </div>
        )
      }
      {
        toggle && (
          <div className="space-y-6">
            <ComponentCard title="Clinic Informations" button="Add Clinic" onToggle={handleToggle}>
              <Table columns={columns} dataSource={clinicData} />
            </ComponentCard>
          </div>
        )
      }
    </>
  )
}

export default Hospital;