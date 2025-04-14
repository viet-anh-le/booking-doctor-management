import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Radio, Image, Space, DatePicker, Table, Typography, Popconfirm, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { useState } from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
          resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

const EditableCell = _a => {
  var { editing, dataIndex, title, inputType, record, index, children } = _a,
    restProps = __rest(_a, [
      'editing',
      'dataIndex',
      'title',
      'inputType',
      'record',
      'index',
      'children',
    ]);
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Detail() {
  const allDoctorAppointments = useSelector(state => state.doctorAppointmentsReducer);
  const appointmentId = useParams().id;
  const currentAppointment = allDoctorAppointments.find(item => item.appointment._id === appointmentId);
  const images = currentAppointment.appointment.symptomImages || [];
  console.log(currentAppointment);
  //Process table drug
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.key === editingKey;
  const edit = record => {
    form.setFieldsValue(Object.assign({ name: '', unit: '', quantity: '', usage: '' }, record));
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = key =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const row = yield form.validateFields();
        const newData = [...data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, Object.assign(Object.assign({}, item), row));
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    });
  const columns = [
    {
      title: 'Name/Content',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      width: '15%',
      editable: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '15%',
      editable: true,
    },
    {
      title: 'Usage',
      dataIndex: 'usage',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
            <Popconfirm title="Sure to delete?" onConfirm={cancel}>
              <a>Delete</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return Object.assign(Object.assign({}, col), {
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'quantity' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    });
  });
  const [count, setCount] = useState(0);
  const handleAdd = () => {
    const newData = {
      key: count,
      name: '',
      unit: '',
      quantity: '',
      usage: ''
    };
    setData([...data, newData]);
    setCount(count + 1);
  };
  //End process table drub

  //Process select services
  const options = [
    {
      label: "Booking appointment",
      value: "Booking appointment"
    },
    {
      label: "Supersonic",
      value: "Supersonic"
    },
    {
      label: "X-ray",
      value: "X-ray"
    },
    {
      label: "Psychological counseling",
      value: "Psychological counseling"
    },
    {
      label: "Eye exam",
      value: "Eye exam"
    },
    {
      label: "Minor eye surgery",
      value: "Minor eye surgery"
    }
  ]
  const handleChange = value => {
    console.log(`Selected: ${value}`);
  };
  //End process select services

  //Process invoice
  const dataSource_invoice = [
    {
      key: '1',
      service: 'Booking appointment',
      quantity: 1,
      ppu: 60000,
      amount: 60000
    },
    {
      key: '2',
      service: 'Psychological counseling',
      quantity: 1,
      ppu: 300000,
      amount: 300000
    },
  ];

  const columns_invoice = [
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price/Unit',
      dataIndex: 'ppu',
      key: 'ppu',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  //End process invoice
  return (
    <>
      <div className="appointment-card-wrap">
        <h2>Patient information</h2>
        <Form
          {...layout}
          onFinish={(values) => onFinish(values)}
          initialValues={
            {
              username: currentAppointment.client_name,
              email: currentAppointment.client_email,
              phone: currentAppointment.client_phone,
              age: currentAppointment.appointment.client_age,
              gender: currentAppointment.appointment.client_gender,
              reason: currentAppointment.appointment.reason
            }
          }
        >
          <Form.Item
            name="username"
            label="Name"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                type: 'number',
                min: 1,
                max: 110,
                required: true
              },
            ]}
            required
          >
            <InputNumber readOnly />
          </Form.Item>
          <FormItem
            name="gender"
            label="Gender"
            rules={[{ required: true }]}
          >
            <Radio.Group disabled
              options={[
                {
                  value: "male",
                  label: "Male"
                },
                {
                  value: "female",
                  label: "Female"
                }
              ]}
            ></Radio.Group>
          </FormItem>
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
          <FormItem
            name="image"
            label="Symptom Images"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {
                images.map((image, index) => (
                  <Image
                    key={index}
                    width={200}
                    src={image}
                  />
                ))
              }
            </div>

          </FormItem>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit">
                Accept
              </Button>
              <Button type="primary" htmlType="submit">
                Deny
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div className="appointment-card-wrap">
        <h2>Information to be filled completely in appointment</h2>
        <Form
          {...layout}
          initialValues={
            {
              date: dayjs("22/04/2025", "DD/MM/YYYY"),
              services: ["Booking appointment"]
            }
          }
        >
          <FormItem
            name="date"
            label="Date of appointment"
          >
            <DatePicker />
          </FormItem>
          <FormItem
            name="services"
            label="Services"
          >
            <Select
              mode="multiple"
              size="middle"
              placeholder="Please select services"
              onChange={handleChange}
              style={{ width: '100%' }}
              options={options}
            />
          </FormItem>
          <FormItem
            name="result"
            label="Results of examination diagnosis of current problem:"
          >
            <Input.TextArea style={{ minHeight: "100px" }}></Input.TextArea>
          </FormItem>
          <FormItem
            name="followUp"
            label="Follow-up appointment"
          >
            <DatePicker />
          </FormItem>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="appointment-card-wrap">
        <h2>Prescription</h2>
        <Form
          form={form}
          labelCol={{ span: 12 }}
        >
          <FormItem>
            <>
              <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                Add new drug
              </Button>
              <Table
                components={{
                  body: { cell: EditableCell },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{ onChange: cancel }}
              />
            </>
          </FormItem>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="appointment-card-wrap">
        <h2>Medical Invoice</h2>
        <Form
          labelCol={{ span: 12 }}
        >
          <FormItem>
            <Table
              dataSource={dataSource_invoice}
              columns={columns_invoice}
              pagination={false}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total amount</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>This is a summary content</Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Status</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <>
                        <Radio.Group value="unpaid" disabled
                          options={[
                            {
                              value: "paid",
                              label: "paid"
                            },
                            {
                              value: "unpaid",
                              label: "unpaid"
                            }
                          ]}
                        ></Radio.Group>
                      </>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </FormItem>
          <FormItem
            label={null}
          >
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </FormItem>
        </Form>
      </div>
    </>
  )
}
export default Detail;