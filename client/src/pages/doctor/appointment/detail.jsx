import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber, Radio, Image, Space, DatePicker, Table, Typography, Popconfirm, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { useEffect, useState, useMemo } from "react";

const serverURL = import.meta.env.VITE_SERVER_URL

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
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
  const navigate = useNavigate();
  const [isAccept, setIsAccept] = useState(true);
  const appointmentId = useParams().id;
  const [currentAppointment, setCurrentAppointment] = useState({});
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentInvoice, setCurrentInvoice] = useState(undefined);
  useEffect(() => {
    const fetchCurrentAppointment = async () => {
      const response = await fetch(`${serverURL}/api/doctor/appointment/detail/${appointmentId}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        setCurrentAppointment(result);
        if (result.appointment.status == "pending" || result.appointment.status == "reject") setIsAccept(false);
      }
    }
    fetchCurrentAppointment();

    const fetchService = async () => {
      const response = await fetch(`${serverURL}/api/doctor/service`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        setServices(result);
      }
    }
    fetchService();

    const fetchInvoice = async () => {
      const response = await fetch(`${serverURL}/api/doctor/invoice/${appointmentId}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result.status === 200) {
        console.log(result);
        setCurrentInvoice(result.invoice);
        setTotalAmount(result.invoice.total);
      }
    }
    fetchInvoice();
  }, []);

  const serviceIds = useMemo(() => {
    console.log("check servicesIds", currentAppointment.appointment?.services);
    return currentAppointment.appointment?.services;
  }, [currentAppointment]);

  const images = currentAppointment.appointment?.symptomImages || [];
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch(`${serverURL}/api/doctor/medicine/${appointmentId}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        setData(result);
      }
    }
    fetchMedicines();
  }, [])
  //Process table drug
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record._id === editingKey;
  const edit = (record) => {
    form.setFieldsValue(Object.assign({ name: '', unit: '', quantity: '', usage: '' }, record));
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const handleDelete = async (_id) => {
    const newData = data.filter(item => item._id !== _id);
    setData(newData);
    setEditingKey('');
    const response = await fetch(`${serverURL}/api/doctor/medicine/edit/${_id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ deleted: true }),
    })
    const result = await response.json();
    if (result.status === 200) {
      console.log("Da xoa thanh cong")
    }

  };
  const save = async (_id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => _id === item._id);
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
      const response = await fetch(`${serverURL}/api/doctor/medicine/edit/${_id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(row),
      })
      const result = await response.json();
      if (result.status === 200) {
        console.log("Cap nhat thanh cong")
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
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
            <Typography.Link onClick={() => save(record._id)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
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
  const handleAdd = async () => {
    const response = await fetch(`${serverURL}/api/doctor/medicine/create/${currentAppointment.appointment._id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({}),
      credentials: "include"
    })
    const result = await response.json();
    console.log(result);

    const newData = {
      _id: result.id,
      name: '',
      unit: '',
      quantity: '',
      usage: ''
    };
    setData([...data, newData]);
    setCount(count + 1);

  };
  //End process table drug

  //Process select services
  const options = services.map((service) => ({
    label: service.name,
    value: service._id,
  }))
  //End process select services

  //Process invoice
  const [dataSource_invoice, setDataSource_invoice] = useState([]);
  const serviceInvoice = serviceIds?.map((service_id, idx) => {
    const serviceData = services.find((s) => s._id === service_id.trim());
    return {
      key: idx,
      name: serviceData.name,
      ppu: serviceData.ppu
    }
  })
  useEffect(() => {
    setDataSource_invoice(serviceInvoice);
  }, [serviceIds])
  const columns_invoice = [
    {
      title: 'Service',
      dataIndex: 'name',
      key: 'name',
      width: '50%'
    },
    {
      title: 'Price',
      dataIndex: 'ppu',
      key: 'ppu',
      width: '50%'
    }
  ];

  const handleFinish = async (values, appId) => {
    console.log(values);
    const formData = new FormData();

    formData.append("services", JSON.stringify(values.services));
    console.log("services = ", JSON.stringify(values.services));
    formData.append("result", values.result);

    const invoiceLen = dataSource_invoice.length;
    let totalAmountTemp = 0;
    const serviceInvoice = values.services.map((service, idx) => {
      const serviceData = services.find((s) => s._id === service);
      totalAmountTemp += serviceData.ppu;
      return {
        key: idx + invoiceLen,
        name: serviceData.name,
        ppu: serviceData.ppu
      }
    })
    setDataSource_invoice(serviceInvoice);
    totalAmountTemp -= 60000;

    setTotalAmount(totalAmountTemp);
    if (values.followUp) formData.append("followUp", values.followUp);
    const response = await fetch(`${serverURL}/api/doctor/appointment/edit/${appId}`, {
      method: "PATCH",
      body: formData,
      credentials: "include"
    })
    const result = await response.json();
    if (result.status === 200) {
      console.log("Cap nhat thanh cong")
    }
  }
  //End process invoice

  //Handle Accept Appointment
  const handleAccept = async () => {
    const response = await fetch(`${serverURL}/api/doctor/appointment/edit/${currentAppointment.appointment._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: "resolve" }),
    })
    const result = await response.json();
    if (result.status === 200) {
      window.location.reload();
    }
  }
  //End handle Accept Appointment

  //Handle Deny Appointment
  const handleDeny = async () => {
    const response = await fetch(`${serverURL}/api/doctor/appointment/edit/${currentAppointment.appointment._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: "reject" }),
    })
    const result = await response.json();
    if (result.status === 200) {
      navigate(-1);
    }
  }
  //End handle Deny Appointment

  const handleSend = async () => {
    const response = await fetch(`${serverURL}/api/doctor/appointment/edit/${currentAppointment.appointment._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: "fulfilled" }),
    })
    const result = await response.json();
    if (result.status === 200) {
      navigate(-1);
    }

    if (!currentInvoice) {
      const fetchInvoice = async () => {
        console.log("serviceIds = ", serviceIds);
        const dueDate = dayjs(currentAppointment.appointment.date).add(30, 'day').toISOString();
        const response = await fetch(`${serverURL}/api/doctor/invoice/create`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            app_id: currentAppointment.appointment._id,
            total: totalAmount,
            serviceIds: serviceIds,
            due: dueDate,
            status: "unpaid"
          }),
          credentials: "include"
        })
        const result = await response.json();
        if (result) {
          console.log(result);
        }
      }
      fetchInvoice();
    }
    else{
      const fetchInvoice = async () => {
        const response = await fetch(`${serverURL}/api/doctor/invoice/edit/${currentInvoice._id}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            app_id: currentAppointment.appointment._id,
            serviceIds: serviceIds,
            total: totalAmount
          }),
          credentials: "include"
        })
        const result = await response.json();
        if (result) {
          console.log(result);
        }
      }
      fetchInvoice();
    }
  }
  if (!currentAppointment || !currentAppointment.appointment) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="appointment-card-wrap">
        <h2>Patient information</h2>
        <Form
          {...layout}
          initialValues={
            {
              username: currentAppointment.client_name,
              email: currentAppointment.client_email,
              phone: currentAppointment.client_phone,
              age: currentAppointment.appointment?.client_age,
              gender: currentAppointment.appointment?.client_gender,
              reason: currentAppointment.appointment?.reason
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
              {
                !isAccept &&
                <Button type="primary" htmlType="submit" onClick={handleAccept}>
                  Accept
                </Button>
              }
              {!isAccept &&
                <Button type="primary" htmlType="submit" onClick={handleDeny}>
                  Deny
                </Button>}
            </Space>
          </Form.Item>
        </Form>
      </div>
      <>
      </>
      {
        (currentAppointment.appointment?.status == "resolve" || currentAppointment.appointment?.status == "fulfilled") &&
        <>
          <div className="appointment-card-wrap">
            <h2>Information to be filled completely in appointment</h2>
            <Form
              {...layout}
              initialValues={
                {
                  date: dayjs(currentAppointment.appointment?.date),
                  services: serviceIds,
                  result: currentAppointment.appointment?.result ? currentAppointment.appointment.result : "",
                  followUp: currentAppointment.appointment?.followUp ? dayjs(currentAppointment.appointment.followUp) : undefined
                }
              }
              onFinish={(values) => handleFinish(values, currentAppointment.appointment?._id)}
            >
              <FormItem
                name="date"
                label="Date of appointment"
              >
                <DatePicker format="DD/MM/YYYY" />
              </FormItem>
              <FormItem
                name="services"
                label="Services"
              >
                <Select
                  mode="multiple"
                  size="middle"
                  placeholder="Please select services"
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
                <DatePicker format="DD/MM/YYYY" />
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
                    rowKey={(record) => record._id}
                    pagination={{ onChange: cancel }}
                  />
                </>
              </FormItem>
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
                        <Table.Summary.Cell index={1}>{totalAmount}</Table.Summary.Cell>
                      </Table.Summary.Row>

                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Status</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          <>
                            <Radio.Group value={currentInvoice ? currentInvoice.status : "unpaid"} disabled
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
                <Button type="primary" htmlType="submit" onClick={handleSend}>
                  Send
                </Button>
              </FormItem>
            </Form>
          </div>
        </>
      }
    </>
  )
}
export default Detail;