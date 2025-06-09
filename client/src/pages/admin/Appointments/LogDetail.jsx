import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { Space, Table, Tag, List } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const serverURL = import.meta.env.VITE_SERVER_URL;

function LogDetail() {
  const data = [];
  const location = useLocation();
  const { record } = location.state || {};
  console.log(record);
  if (record) {
    const createdItem = `${record.client_name} <span style="color:blue; font-weight:bold">created appointment ${record._id}</span> at ${dayjs(record.createdAt).format("HH:mm DD MMMM YYYY")}`;
    data.push(createdItem);
    if (record.updated) {
      record.updated.forEach(item => {
        const color = item.action.includes("changed") || item.action.includes("rejected") ? "red" : "green";
        const updatedItem = `${record.doctor_name} <span style="color:${color}; font-weight:bold">${item.action}</span> at ${dayjs(item.updatedAt).format("HH:mm DD MMMM YYYY")}`;
        data.push(updatedItem);
      })
    }
  }
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Appointment Informations" >
          <List
            size="large"
            header={<h2 className="font-bold">Appointment Log {record._id}</h2>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item><span dangerouslySetInnerHTML={{ __html: item }} /></List.Item>}
          />
        </ComponentCard>
      </div>
    </>
  )
}

export default LogDetail;