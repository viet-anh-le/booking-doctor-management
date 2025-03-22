import { DatePicker } from 'antd';
import { Button, Form, Table, Space, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const columns = [
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    time: "20:00 23/03/2025",
    key: '1',
    name: 'John Brown',
    age: 32,
    gender: 'Male',
    tags: ['nice', 'developer'],
  },
  {
    time: "20:00 23/03/2025",
    key: '2',
    name: 'Jim Green',
    age: 42,
    gender: 'Male',
    tags: ['loser'],
  },
  {
    time: "20:00 23/03/2025",
    key: '3',
    name: 'Joe Black',
    age: 32,
    gender: 'Male',
    tags: ['cool', 'teacher'],
  },
];

function DoctorAppointment() {
  const [form] = Form.useForm();
  return (
    <>
      <div className="list-appointment-content p-5">
        <div className="title mb-4">
          <h1 className="text-xl">List of appointments</h1>
        </div>
        <div className="appointment-content bg-white shadow-sm">
          <div className="appointment-header p-5 bg-gray-50">
            <Form
              layout="inline"
              form={form}
            >
              <FormItem label="Time" layout='vertical'>
                <DatePicker style={{ width: "500px" }} />
              </FormItem>
              <FormItem label=" " layout='vertical'>
                <Button type='primary'>Search</Button>
              </FormItem>
            </Form>
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