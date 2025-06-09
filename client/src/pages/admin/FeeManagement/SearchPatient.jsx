import { Button, Form, Input, Alert, Tag, Space, Table, Modal, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, CreditCardOutlined, EyeOutlined } from "@ant-design/icons";
import { renderMatches, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import dayjs from 'dayjs';

const serverURL = import.meta.env.VITE_SERVER_URL;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

function SearchPatient() {
  const [form] = Form.useForm();
  const [invoiceData, setInvoiceData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();
  const handleFinish = (values) => {
    const params = new URLSearchParams();
    if (values.name) {
      params.set('client_name', values.name);
    }
    if (values.id) {
      params.set('client_id', values.id);
    }
    if (values.phone) {
      params.set('client_phone', values.phone)
    }
    if (values.bhyt) {
      params.set('bhyt', values.bhyt);
    }
    if (values.app_id) {
      params.set('app_id', values.app_id);
    }
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/invoice?${params.toString()}`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      if (response.ok) {
        const tempData = result.map(item => {
          return ({
            key: item.invoiceId,
            ...item
          })
        })
        console.log(result);
        setInvoiceData(tempData)
      }
      else {
        setInvoiceData([]);
      }
    }
    fetchApi();
  }

  const showModal = (record) => {
    setIsModalOpen(true);
    console.log(record);
    setCurrentRecord(record);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/invoice/edit/${currentRecord.invoiceId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ status: "paid", method: selectedMethod ? selectedMethod : currentRecord.method }),
        credentials: "include"
      })
      const result = await response.json();
      if (result.status === 200) {
        console.log("Cap nhat thanh cong");
        setInvoiceData(prev =>
          prev.map(item => item.invoiceId === currentRecord.invoiceId ? { ...item, status: "paid" } : item)
        );
      }
    }
    fetchApi();
    setCurrentRecord(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const columns = [
    {
      title: 'Patient ID',
      dataIndex: 'client_id',
      key: 'client_id'
    },
    {
      title: 'Name',
      dataIndex: 'client_name',
      key: 'client_name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format("DD/MM/YYYY")
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => {
        if (record.status === "paid") {
          return <Tag color="green">Paid</Tag>;
        }
        return <Tag color="red">Unpaid</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}><EyeOutlined /></a>
          {/* <a><CreditCardOutlined/></a> */}
        </Space>
      ),
    },
  ];

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
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
        <div className='mb-5'>
          <Button type="link" onClick={() => navigate(-1)}> <ArrowLeftOutlined /> </Button>
          <h2 className='inline-block'>Search Patient</h2>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
          style={{ maxWidth: 1000, margin: "auto" }}
          onFinish={handleFinish}
        >
          <Form.Item label="Patient name" name="name">
            <Input style={{ minHeight: 40 }} />
          </Form.Item>
          <Form.Item label="Patinent ID" name="id">
            <Input style={{ minHeight: 40 }} />
          </Form.Item>
          <Form.Item label="Appointment ID" name="app_id">
            <Input style={{ minHeight: 40 }} />
          </Form.Item>
          <Form.Item label="Phone number" name="phone">
            <Input style={{ minHeight: 40 }} />
          </Form.Item>
          <Form.Item label="Identification" name="bhyt" rules={[{ required: true, message: 'Please input!' }]}>
            <Input style={{ minHeight: 40 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="space-y-6 mt-5">
        <ComponentCard title="Invoice Informations">
          <Table columns={columns} dataSource={invoiceData} />
        </ComponentCard>
      </div>

      {
        currentRecord &&
        <Modal
          title={`Invoice ${currentRecord.invoiceId}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          okText="Pay"
        >
          <div>
            <Table
              dataSource={currentRecord.services}
              columns={columns_invoice}
              pagination={false}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total amount</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{currentRecord.total}</Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Status</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <>
                        <Radio.Group value={currentRecord?.method || selectedMethod}
                          onChange={(e) => {
                            if (!currentRecord?.method) {
                              setSelectedMethod(e.target.value);
                            }
                          }}
                          disabled={!!currentRecord?.method}
                          options={[
                            {
                              value: "cash",
                              label: "Cash"
                            },
                            {
                              value: "bank",
                              label: "Bank transfers"
                            },
                            {
                              value: "bhyt",
                              label: "BHYT"
                            }
                          ]}
                        ></Radio.Group>
                      </>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
            <div className='mt-5'>
              <Alert message="Note: Payed for booking system -60000VND" type="warning" />
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default SearchPatient