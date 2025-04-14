import { DatePicker } from 'antd';
import { Button, Form, Table, Space, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { generateSevenDay } from '../../../utils/generateSevenday';
import dayjs from "dayjs"

const serverURL = import.meta.env.VITE_SERVER_URL

function DoctorAppointment() {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Schedules',
      key: 'schedules',
      dataIndex: 'schedules',
      render: (_, record) => (
        <>
          {record.schedules.map((schedule, index) => {
            return (
              <Tag
                color="blue"
                key={index}
                style={{ padding: "5px", fontSize: "1rem" }}
                closable={isClosable}
                onClose={() => handleClose(schedule)}
              >
                {schedule.time}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {
            isClosable ? 
            <a onClick={handleSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
              </svg> 
            </a> : 
            <a onClick={() => setIsClosable(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </a>
          }
          <a onClick={() => handleDeleteAll(record)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </a>
        </Space>
      ),
    },
  ];
  const dispatch = useDispatch();
  const doctorAccount = useSelector(state => state.doctorAccountReducer);
  const sevenDay = generateSevenDay();
  const [data, setData] = useState([]);
  const [isClosable, setIsClosable] = useState(false);
  const [scheduleDeleted, setScheduleDeleted] = useState([]);
  const [reload, setReload] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/schedule/${doctorAccount._id}?startDate=${sevenDay[0].date}&endDate=${sevenDay[6].date}`);
      const result = await response.json();
      const newArray = sevenDay.map((day, index) => {
        const schedules = result.filter((item) => {
          return dayjs(item.date).format("DD/MM/YYYY") == day.date
        }).map(item => {
          return {
            id: item._id,
            time: item.time
          }
        });
        return {
          key: index,
          date: day.date,
          schedules: schedules
        }
      });
      setData(newArray);
    }
    fetchApi();
  }, [reload])

  const handleClose = (schedule) => {
    const newArr = [...scheduleDeleted, schedule.id];
    setScheduleDeleted(newArr);
  }

  const handleSubmit = () => {
    setIsClosable(false);
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/schedule/delete`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            idsDeleted: scheduleDeleted
          })
        }
      )
      const result = await response.json();
      console.log(result);
    }
    fetchApi();
  }

  const handleDeleteAll = (record) => {
    const idsDeleted = record.schedules.map((schedule) => schedule.id);
    setScheduleDeleted(idsDeleted);
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/schedule/delete`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            idsDeleted: idsDeleted
          })
        }
      )
      const result = await response.json();
      console.log(result);
    }
    fetchApi();
    setReload(!reload);
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("create");
  }
  return (
    <>
      <div className="list-appointment-content p-5">
        <div className="title mb-4 flex justify-between">
          <h1 className="text-xl">Manage your plan for the week</h1>
          <div className='schedule-add-btn'>
            <Button color="primary" variant="outlined" style={{ padding: "18px" }} onClick={handleClick}>
              <PlusCircleOutlined />
              Add New
            </Button>
          </div>
        </div>
        <div className="appointment-content bg-white shadow-sm">
          <div className="appointment-header p-5 bg-gray-50">
            <h6 className='font-medium text-blue-400'>Plan created (7 days)</h6>
          </div>
          <div className="appointment-body bg-white">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorAppointment;