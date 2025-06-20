import "./style.css"
import { Button, Table, Tag, Modal, Form, Input, DatePicker, List, Space, Select } from 'antd';
import FormItem from "antd/es/form/FormItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Papa from 'papaparse';

const serverURL = import.meta.env.VITE_SERVER_URL;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function AllAppointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPresOpen, setIsModalPresOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [dataPres, setDataPres] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const colums_pres = [
    {
      title: 'Name/Content',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Usage',
      dataIndex: 'usage',
      key: 'usange',
    },
  ];

  const showModal = (record) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
    console.log(record);

    const fetchMedicines = async () => {
      const response = await fetch(`${serverURL}/api/doctor/medicine/${record.key}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        setDataPres(result);
        console.log(result);
      }
    }
    fetchMedicines();
  };

  const showPresModal = (record) => {
    setIsModalPresOpen(true);
    setCurrentRecord(record);
    console.log(record);

    const fetchMedicines = async () => {
      const response = await fetch(`${serverURL}/api/doctor/medicine/${record.key}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        setDataPres(result);
        console.log(result);
      }
    }
    fetchMedicines();
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const handlePresOk = () => {
    setIsModalPresOpen(false);
    setCurrentRecord(null);
    setDataPres([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const handlePresCancel = () => {
    setIsModalPresOpen(false);
    setCurrentRecord(null);
    setDataPres([]);
  };

  const [allAppointments, setAllAppointments] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filterDoctor, setFilterDoctor] = useState([]);
  const userAccount = useSelector(state => state.accountReducer);
  useEffect(() => {
    const fetchallAppointments = async () => {
      const response = await fetch(`${serverURL}/api/appointments/${userAccount._id}`, {
        method: "GET",
        credentials: "include"
      })
      let result = await response.json();
      if (result.status === 200) {
        const resultData = result.data;
        // Lấy danh sách profile name
        const tempProfiles = new Set();
        resultData.forEach((item) => {
          tempProfiles.add(item.client_name);
        });

        setProfiles(Array.from(tempProfiles).map(item => ({
          label: item,
          value: item
        })));
        setAllAppointments(resultData);
      }
    }
    fetchallAppointments();
  }, [])

  useEffect(() => {
    let filtered = [];

    if (selectedProfiles.length === 0) {
      // Không chọn profile nào -> chỉ hiển thị appointments của userAccount
      filtered = allAppointments.filter(item =>
        item.appointment.client_id === userAccount._id
      );
    } else {
      // Hiển thị appointments của các profile được chọn
      filtered = allAppointments.filter(item =>
        selectedProfiles.includes(item.client_name)
      );
    }

    const groupedData = filtered.reduce((acc, appointment) => {
      const formattedDate = dayjs(appointment.appointment.date).format("DD/MM/YYYY");
      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          key: formattedDate,
          date: formattedDate,
          rawDate: appointment.appointment.date,
          appointments: []
        };
      }

      acc[formattedDate].appointments.push({
        appointment: appointment.appointment,
        doctor_name: appointment.doctor_name
      });

      return acc;
    }, {});

    let groupedArray = Object.values(groupedData);
    groupedArray.sort((a, b) => dayjs(b.rawDate).valueOf() - dayjs(a.rawDate).valueOf());
    const tempData = [];
    const tempFilter = [];
    const tempFilterDoctor = new Set();

    groupedArray.forEach((item) => {
      tempData.push({
        key: item.key,
        date: item.date
      })
      tempFilter.push({
        text: item.date,
        value: item.date
      })
      item.appointments.forEach((obj) => {
        tempData.push({
          key: obj.appointment._id,
          ...obj.appointment,
          doctor: obj.doctor_name
        })
        tempFilterDoctor.add(obj.doctor_name);
      })
    })

    setData(tempData);
    setFilter(tempFilter);
    setFilterDoctor(Array.from(tempFilterDoctor).map(name => ({
      text: name,
      value: name
    })));
  }, [selectedProfiles, allAppointments]);


  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: "15%",
      render: (date, record, _) => {
        const fieldCount = Object.keys(record).length;
        return (fieldCount === 2) ? <strong>{date}</strong> : record.time;
      },
      filters: filter,
      onFilter: (value, record) => {
        const currentDateStr = dayjs(record.date).format("DD/MM/YYYY");
        if (currentDateStr.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false
      },
    },
    {
      title: 'Speciality',
      dataIndex: 'spec',
      width: "15%",
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      width: "25%",
      filters: filterDoctor,
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
          text: 'Resolve',
          value: 'resolve',
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
          text: 'Fulfilled',
          value: 'fulfilled',
        }
      ],
      onFilter: (value, record) => {
        if (!record.status || record.status?.toLowerCase() === (value.toLowerCase()))
          return true;
        return false
      },
      render: (status) => {
        if (status == "resolve")
          return <Tag color="green">Resolve</Tag>
        if (status == "pending") {
          return <Tag color="yellow">Pending</Tag>
        }
        if (status == "reject")
          return <Tag color="red">Reject</Tag>
        if (status == "fulfilled")
          return <Tag color="blue">Fulfilled</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: "20%",
      render: (_, record, index) => {
        const fieldCount = Object.keys(record).length;
        if (fieldCount !== 2 && record.status == "fulfilled") {
          return (
            <>
              <Space size="middle">
                <Button type="primary" ghost onClick={() => showModal(record)}>
                  View Result
                </Button>
                <Button type="primary" ghost onClick={() => showPresModal(record)}>
                  View Prescription
                </Button>
              </Space>
            </>
          )
        }
      },
    },
  ];
  const handleChange = (value) => {
    setSelectedProfiles(value);
  }
  const handleExportCSV = () => {
    if (!dataPres || dataPres.length === 0) return;

    const filteredData = dataPres.map(item => ({
      "Name/Content": item.name || '',
      "Quantity": item.quantity || '',
      "Unit": item.unit || '',
      "Usage": item.usage || ''
    }));

    // Chuyển sang CSV và thêm BOM để Excel đọc đúng tiếng Việt
    const csv = '\uFEFF' + Papa.unparse(filteredData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'prescription.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="allAppointment-wrap-card bg-blue-100">
        <div className="flex">
          <h2 className="ml-[5%] pb-5 pt-5 font-bold text-xl">Appointments</h2>
          <Select
            size="middle"
            placeholder="Select profiles"
            style={{ width: '30%', marginTop: "auto", marginBottom: "auto", marginLeft: "20px" }}
            options={profiles}
            onChange={(value) => handleChange(value)}
          />
        </div>
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

        {
          currentRecord &&
          <Modal
            title={`Appointment Result - Appointment ID: ${currentRecord._id}`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
          >
            <Form
              {...layout}
              initialValues={
                {
                  reason: currentRecord.reason
                }
              }
            >
              <Form.Item
                name="reason"
                label="Reason for examination"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input.TextArea readOnly />
              </Form.Item>
            </Form>
            <div >
              <h2 className="mb-4 font-bold text-base">Information to be filled completely in appointment</h2>
              <Form
                {...layout}
                initialValues={
                  {
                    date: dayjs(currentRecord.date),
                    result: currentRecord.result,
                    followUp: currentRecord.followUp ? dayjs(currentRecord.followUp) : undefined
                  }
                }
              >
                <FormItem
                  name="date"
                  label="Date of appointment"
                >
                  <DatePicker format="DD/MM/YYYY" readOnly />
                </FormItem>
                <FormItem
                  name="services"
                  label="Services"
                >
                  <List
                    bordered
                    dataSource={currentRecord.services}
                    renderItem={(item) => (
                      <List.Item>
                        {item}
                      </List.Item>
                    )}
                  />
                </FormItem>
                <FormItem
                  name="result"
                  label="Results after diagnosis"
                >
                  <Input.TextArea style={{ minHeight: "100px" }} readOnly></Input.TextArea>
                </FormItem>
                <FormItem
                  name="followUp"
                  label="Follow-up appointment"
                >
                  <DatePicker format="DD/MM/YYYY" readOnly />
                </FormItem>
              </Form>
            </div>
          </Modal>
        }

        {
          dataPres.length !== 0 &&
          <Modal
            title="Prescription"
            open={isModalPresOpen}
            onOk={handlePresOk}
            onCancel={handlePresCancel}
            width={1000}
            footer={[
              <Button key="export" type="primary" onClick={handleExportCSV}>Export CSV</Button>,
            ]}
          >
            <div>
              <Table
                dataSource={dataPres}
                columns={colums_pres}
                rowKey={(record) => record._id}
                pagination={false}
              />
            </div>
          </Modal>
        }
      </div>
    </>
  )
}

export default AllAppointment