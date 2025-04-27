import "./style.css"
import { Button, Table, Tag, Modal, Form, Input, DatePicker, List } from 'antd';
import FormItem from "antd/es/form/FormItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
  const [currentRecord, setCurrentRecord] = useState(null);
  const [dataPres, setDataPres] = useState([]);

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
    // console.log(record);
    setIsModalOpen(true);
    setCurrentRecord(record);

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

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

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
      const result = await response.json();
      if (result) {
        const groupedData = result.reduce((acc, appointment) => {
          const formattedDate = dayjs(appointment.appointment.date).format("DD/MM/YYYY"); // Định dạng lại ngày

          if (!acc[formattedDate]) {
            acc[formattedDate] = {
              key: formattedDate, // Tạo key cho ngày
              date: formattedDate,
              appointments: []
            };
          }

          acc[formattedDate].appointments.push({
            appointment: appointment.appointment,
            doctor_name: appointment.doctor_name
          });

          return acc;
        }, {});

        // Chuyển đối tượng thành mảng, mỗi phần tử là một nhóm theo ngày
        const groupedArray = Object.values(groupedData);
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
        console.log(tempData);
        setData(tempData);
        setFilter(tempFilter);
        setFilterDoctor(Array.from(tempFilterDoctor).map(name => ({
          text: name,
          value: name
        })));
      }
    }
    fetchallAppointments();
  }, [])

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
              <Button type="primary" ghost onClick={() => showModal(record)}>
                View Result
              </Button>
            </>
          )
        }
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

        {
          currentRecord &&
          <Modal
            title="Appoitment Result"
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
                    services: currentRecord.services,
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

            <div>
              <h2 className="mb-4 font-bold text-base">Prescription</h2>
              <Table
                dataSource={dataPres}
                columns={colums_pres}
                rowKey={(record) => record._id}
              />
            </div>
          </Modal>
        }
      </div>
    </>
  )
}

export default AllAppointment