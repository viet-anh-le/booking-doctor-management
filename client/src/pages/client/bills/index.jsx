import { Modal, Radio, Table, Tag, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { EyeOutlined } from "@ant-design/icons"
import dayjs from "dayjs";

const serverURL = import.meta.env.VITE_SERVER_URL;

function ManageBills() {
  const userAccount = useSelector(state => state.accountReducer);
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch(`${serverURL}/api/invoice/${userAccount._id}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        console.log(result);
        // Tạo một Set để lưu unique dates
        const uniqueDates = new Set();

        const formattedData = result.map((item, index) => {
          const formattedDate = dayjs(item.date).format("DD/MM/YYYY");
          uniqueDates.add(formattedDate);
          return ({
            key: index,
            app_id: item.app_id,
            date: item.date,
            total: item.total,
            due: item.due,
            status: item.status,
            services: item.services.map((service, idx) => ({
              ...service,
              key: `${item.app_id}-service-${idx}` // Thêm unique key cho mỗi service
            }))
          });
        });
        console.log(formattedData);

        // Convert Set thành array của objects theo format của Ant Design
        const dateFilters = Array.from(uniqueDates).map(date => ({
          text: date,
          value: date
        }));

        setDateFilter(dateFilters);
        setData(formattedData);
      }
    }
    fetchInvoices();
  }, [])
  const showModal = (record) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };
  const columns = [
    {
      title: 'Appointment Id',
      dataIndex: 'app_id',
      key: 'app_id',
      sorter: (a, b) => a.app_id.localeCompare(b.app_id),
      sortOrder: sortedInfo.columnKey === 'app_id' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      filters: dateFilter,
      onFilter: (value, record) => {
        const currentDateStr = dayjs(record.date).format("DD/MM/YYYY");
        if (currentDateStr.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false
      },
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY")  // Thêm return statement
      },
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'total',
      key: 'total',
      sorter: (a, b) => a.total - b.total,
      sortOrder: sortedInfo.columnKey === 'total' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: 'Paid',
          value: 'paid',
        },
        {
          text: 'Unpaid',
          value: 'unpaid',
        }
      ],
      onFilter: (value, record) => {
        if (!record.status || record.status?.toLowerCase() === (value.toLowerCase()))
          return true;
        return false
      },
      render: (status) => {
        if (status == "paid")
          return <Tag color="green">Paid</Tag>
        if (status == "unpaid")
          return <Tag color="yellow">Unpaid</Tag>
      }
    },
    {
      key: 'action',
      width: "20%",
      render: (_, record, index) => {

        return (
          <>
            <a onClick={() => showModal(record)}>
              <EyeOutlined />
            </a>
          </>
        )
      },
    }
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
      <div className="allAppointment-wrap-card bg-blue-100">
        <h2 className="ml-[5%] pb-5 pt-5 font-bold text-xl">Billing History</h2>
        <div className="bg-opacity-50">
          <Table
            columns={columns}
            dataSource={data}
            onChange={handleChange}
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
            title={`Invoice ${currentRecord.id}`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
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
                          <Radio.Group value={currentRecord.status} disabled
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
              <div className='mt-5'>
                <Alert message="Thank you for choosing our system" type="success" />
              </div>
            </div>
          </Modal>
        }
      </div>
    </>
  )
}

export default ManageBills;