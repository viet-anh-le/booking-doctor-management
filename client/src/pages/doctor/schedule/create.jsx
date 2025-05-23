import "./style.css"
import { DatePicker } from 'antd';
import { Button, Form, Table, Input, Alert } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import dayjs from "dayjs"

const serverURL = import.meta.env.VITE_SERVER_URL

function DoctorScheduleCreate() {
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [scheduleArr, setScheduleArr] = useState([]);
  const columns = [
    {
      title: 'Range',
      dataIndex: 'range',
      key: 'range',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }
  ];

  const [dataSource, setDataSource] = useState([]);

  const handleClick = (e) => {
    const range = e.target.value;
    e.target.classList.toggle("time-btn-active");
    setScheduleArr(
      scheduleArr.includes(range) ? scheduleArr.filter(item => item !== range) : [...scheduleArr, range]
    );
    const date = new Date(selectedDate);
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    setDataSource(prevDataSource => {
      if (scheduleArr.includes(range)) {
        return prevDataSource.filter(item => {
          if (item.range == range && item.date == formattedDate) return false;
          return true;
        }).map((item, index) => ({ ...item, key: index + 1 }));
      }
      return [...prevDataSource, {
        key: prevDataSource.length + 1,
        range: range,
        date: formattedDate
      }];
    });
  }

  const maxBooking = 2;

  const doctorAccount = useSelector(state => state.doctorAccountReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/schedule/create`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            doctorId: doctorAccount._id,
            maxBooking: maxBooking,
            sumBooking: 0,
            plan: dataSource
          }),
          credentials: "include"
        }
      )
      const result = await response.json();
      if (result.status === 200){
        const alert = document.querySelector(".alert");
        alert.classList.remove("hidden");
      }
    }
    fetchApi();
    setDataSource([]);
    const allTimeBtns = [...document.querySelectorAll(".time-btn")];
    allTimeBtns.map((button) => {
      button.classList.remove("time-btn-active");
    })
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.$d);
    setScheduleArr([]);
    const allTimeBtns = [...document.querySelectorAll(".time-btn")];
    allTimeBtns.map((button) => {
      button.classList.remove("time-btn-active");
    })
  }
  return (
    <>
      <div className="create-schedule-content p-5">
        <div className="title mb-4">
          <h1 className="text-xl">Add a clinic schedule</h1>
        </div>
        <div className="relative">
          <div className="alert absolute -right-0 z-2 hidden">
            <Alert
              message="Success"
              description="Create new schedule successful!"
              type="success"
              showIcon
              closable
            />
          </div>
          <div className='schedule-form-row'>
            <Form
              form={form}
              layout='inline'
              initialValues={
                {
                  fullName: doctorAccount.fullName
                }
              }
            >
              <FormItem
                layout='vertical'
                label="Select Date:"
                style={{ width: "50%" }}
              >
                <DatePicker
                  name="date"
                  style={{ width: "100%" }}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  defaultValue={dayjs()}
                />
              </FormItem>
              <FormItem
                layout='vertical'
                label="Doctor"
                name="fullName"
                style={{ width: "40%" }}
              >
                <Input disabled />
              </FormItem>
            </Form>
          </div>
          <div className='sechedule-form-time'>
            <div>
              <span className='block m-4'>Select time period:</span>
              <div className='lst-btn-schedule m-4'>
                <button id="time-08-09" value="08:00 - 09:00" className='time-btn' onClick={handleClick}>
                  08:00 - 09:00
                </button>
                <button id="time-09-10" value="09:00 - 10:00" className='time-btn' onClick={handleClick}>
                  09:00 - 10:00
                </button>
                <button id="time-10-11" value="10:00 - 11:00" className='time-btn' onClick={handleClick}>
                  10:00 - 11:00
                </button>
                <button id="time-11-12" value="11:00 - 12:00" className='time-btn' onClick={handleClick}>
                  11:00 - 12:00
                </button>
                <button id="time-12-13" value="12:00 - 13:00" className='time-btn' onClick={handleClick}>
                  12:00 - 13:00
                </button>
                <button id="time-13-14" value="13:00 - 14:00" className='time-btn' onClick={handleClick}>
                  13:00 - 14:00
                </button>
                <button id="time-14-15" value="14:00 - 15:00" className='time-btn' onClick={handleClick}>
                  14:00 - 15:00
                </button>
                <button id="time-15-16" value="15:00 - 16:00" className='time-btn' onClick={handleClick}>
                  15:00 - 16:00
                </button>
                <button id="time-16-17" value="16:00 - 17:00" className='time-btn' onClick={handleClick}>
                  16:00 - 17:00
                </button>
                <button id="time-17-18" value="17:00 - 18:00" className='time-btn' onClick={handleClick}>
                  17:00 - 18:00
                </button>
                <button id="time-18-19" value="18:00 - 19:00" className='time-btn' onClick={handleClick}>
                  18:00 - 19:00
                </button>
                <button id="time-19-20" value="19:00 - 20:00" className='time-btn' onClick={handleClick}>
                  19:00 - 20:00
                </button>
                <button id="time-20-21" value="20:00 - 21:00" className='time-btn' onClick={handleClick}>
                  20:00 - 21:00
                </button>
                <button id="time-21-22" value="21:00 - 22:00" className='time-btn' onClick={handleClick}>
                  21:00 - 22:00
                </button>
                <button id="time-22-23" value="22:00 - 23:00" className='time-btn' onClick={handleClick}>
                  22:00 - 23:00
                </button>
                <div className='flex justify-center mt-4'>
                  <Button type="primary" onClick={handleSubmit}>Save</Button>
                </div>
              </div>
            </div>
          </div>
          <div className='m-4'>
            <span className='block m-4'>Selected Range:</span>
            <div>
              <Table dataSource={dataSource} columns={columns} style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorScheduleCreate;