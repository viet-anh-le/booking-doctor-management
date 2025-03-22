import { DatePicker } from 'antd';
import { Button, Form, Table, Space, Tag, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import "./style.css"

function DoctorScheduleCreate() {
  const [form] = Form.useForm();

  const handleClick = (e) => {
    e.target.classList.toggle("time-btn-active");
  }

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

  const dataSource = [
    {
      key: '1',
      range: '08:00 - 09:00',
      date: "23/03/2025"
    },
    {
      key: '2',
      range: "09:00 - 10:00",
      date: "23/03/2025"
    },
  ];

  return (
    <>
      <div className="create-schedule-content p-5">
        <div className="title mb-4">
          <h1 className="text-xl">Add a clinic schedule</h1>
        </div>
        <div className='mx-auto'>
          <div className='schedule-form-row'>
            <Form
              form={form}
              layout='inline'
              initialValues={
                {
                  fullName: "Doctor - Evan"
                }
              }
            >
              <FormItem
                layout='vertical'
                label="Select Date:"
                style={{ width: "50%" }}
              >
                <DatePicker style={{ width: "100%" }} />
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
                  <Button type="primary">Save</Button>
                </div>
              </div>
            </div>
          </div>
          <div className='m-4'>
            <span className='block m-4'>Selected Range:</span>
            <div>
              <Table dataSource={dataSource} columns={columns} style={{width: "100%"}}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorScheduleCreate;