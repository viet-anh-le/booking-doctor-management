import "./style.css"
import { Button, Table, Tag } from 'antd';
import dayjs from "dayjs";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

function AllAppointment() {
  const data = [
    {
      key: 0,
      date: dayjs("13/04/2025", "DD/MM/YYYY"),
    },
    {
      key: 1,
      date: dayjs("13/04/2025", "DD/MM/YYYY"),
      time: "08:00 - 09:00",
      speciality: "Psychiatrist",
      doctor: "Dr. Michael Brown",
      status: "Pending"
    },
    {
      key: 2,
      date: dayjs("13/04/2025", "DD/MM/YYYY"),
      time: "10:00 - 11:00",
      speciality: "Psychiatrist",
      doctor: "Dr. Michael Brown",
      status: "Unpaid"
    },
    {
      key: 3,
      date: dayjs("13/04/2025", "DD/MM/YYYY"),
      time: "11:00 - 12:00",
      speciality: "Psychiatrist",
      doctor: "Alex",
      status: "Accept"
    },
    {
      key: 4,
      date: dayjs("14/04/2025", "DD/MM/YYYY"),
    },
    {
      key: 5,
      date: dayjs("14/04/2025", "DD/MM/YYYY"),
      time: "08:00 - 09:00",
      speciality: "Psychiatrist",
      doctor: "Dr. Michael Brown",
      status: "Paid"
    },
    {
      key: 6,
      date: dayjs("14/04/2025", "DD/MM/YYYY"),
      time: "10:00 - 11:00",
      speciality: "Psychiatrist",
      doctor: "Dr. Michael Brown",
      status: "Accept"
    },
    {
      key: 7,
      date: dayjs("14/04/2025", "DD/MM/YYYY"),
      time: "11:00 - 12:00",
      speciality: "Psychiatrist",
      doctor: "Alex",
      status: "Accept"
    },
  ]

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: "15%",
      render: (date, record, _) => {
        const currentDateStr = date.format("DD/MM/YYYY");
        const isFirstOccurrence = data.findIndex(item =>
          item.date.format("DD/MM/YYYY") === currentDateStr
        ) === record.key;
        return isFirstOccurrence ? <strong>{currentDateStr}</strong> : record.time;
      },
      filters: [
        {
          text: "13/04/2025",
          value: "13/04/2025",
        },
        {
          text: "14/04/2025",
          value: "14/04/2025",
        },
      ],
      onFilter: (value, record) => {
        const currentDateStr = record.date.format("DD/MM/YYYY");
        if (currentDateStr.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false
      },
    },
    {
      title: 'Speciality',
      dataIndex: 'speciality',
      width: "15%",
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      width: "25%",
      filters: [
        {
          text: 'Dr. Aleksandr Kovalskiy',
          value: 'Dr. Aleksandr Kovalskiy',
        },
        {
          text: 'Dr. Michael Brown',
          value: 'Dr. Michael Brown',
        },
      ],
      onFilter: (value, record) => {
        if (!record.doctor || record.doctor.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: "25%",
      filters: [
        {
          text: 'Accept',
          value: 'accept',
        },
        {
          text: 'Pending',
          value: 'pending',
        },
        {
          text: 'Reject',
          value: 'reject',
        },
        {
          text: 'Unpaid',
          value: 'unpaid'
        },
        {
          text: 'Paid',
          value: 'paid',
        },
      ],
      onFilter: (value, record) => {
        if (!record.status || record.status?.toLowerCase() === (value.toLowerCase()))
          return true;
        return false
      },
      render: (status) => {
        if (status == "Accept")
          return <Tag color="processing">Accept</Tag>
        if (status == "Pending") {
          return <Tag color="warning">Pending</Tag>
        }
        if (status == "Reject")
          return <Tag color="error">Reject</Tag>
        if (status == "Paid")
          return <Tag icon={<CheckCircleOutlined />} color="success">Paid</Tag>
        if (status == "Unpaid") return <Tag icon={<CloseCircleOutlined />} color="red">Unpaid</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: "20%",
      render: (_, record, index) => {
        const currentDateStr = record.date.format("DD/MM/YYYY");
        const isFirstOccurrence = data.findIndex(item =>
          item.date.format("DD/MM/YYYY") === currentDateStr
        ) === record.key;
        if (!isFirstOccurrence)
          return (
            // <Space size="middle">
            //   <a>Delete</a>
            //   <a>
            //     <Space>
            //       More actions
            //       <DownOutlined />
            //     </Space>
            //   </a>
            // </Space>
            <Button type="primary" ghost>
              View appointment
            </Button>
          )
      },
    },
  ];
  return (
    <>
      <div className="allAppointment-wrap-card bg-blue-100">
        <h2 className="ml-[5%] pb-5 pt-5 font-bold text-xl">Appointments</h2>
        <div className="bg-opacity-50">
          <Table
            columns={columns}
            dataSource={data}
            style={{
              width: "90%",
              marginLeft: "5%"
            }}
            rowClassName={(record) => {
              return "bg-transparent"
            }}
          />
        </div>

        <div className="appointment-content">

        </div>
      </div>
    </>
  )
}

export default AllAppointment