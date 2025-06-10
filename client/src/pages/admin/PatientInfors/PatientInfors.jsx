import { Space, Table, Tag, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { useEffect, useState, useRef } from 'react';
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
const serverURL = import.meta.env.VITE_SERVER_URL;
function PatientInfors() {

  const handleDelete = (id) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/patient-accounts/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ deleted: true }),
        credentials: "include"
      });
      const result = await response.json();
      if (result.status === 200) {
        setData(prev =>
          prev.map(patient => patient._id === id ? { ...patient, deleted: true } : patient)
        );
      }
    }
    fetchApi();
  }
  //Handle Search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => {
            var _a;
            return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
          }, 100);
        }
      },
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Patient ID',
      dataIndex: '_id',
      key: '_id',
    },
    Object.assign(
      {
        title: 'Patient name',
        dataIndex: 'fullName',
        key: 'fullName',
      },
      getColumnSearchProps("fullName")
    ),
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'BHYT',
      dataIndex: 'bhyt',
      key: 'bhyt',
    },
    {
      title: 'Number of profiles',
      dataIndex: 'profilesLen',
      key: 'profilesLen',
    },
    {
      title: 'Total appointments',
      dataIndex: 'totalAppointments',
      key: 'totalAppointments',
      sorter: (a, b) => a.totalAppointments - b.totalAppointments,
    },
    {
      title: 'Today appointments',
      dataIndex: 'todayAppointments',
      key: 'todayAppointments',
      sorter: (a, b) => a.todayAppointments - b.todayAppointments,
    },
    {
      title: 'Status',
      key: 'deleted',
      dataIndex: 'deleted',
      filters: [
        {
          text: 'Active',
          value: false,
        },
        {
          text: 'Deleted',
          value: true,
        }
      ],
      onFilter: (value, record) => {
        if (value === record.deleted)
          return true;
        return false
      },
      render: (_, record) => (
        <>
          <Tag color={record.deleted ? "red" : "green"} key={record.name}>
            {record.deleted ? "Deleted" : "Active"}
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        !record.deleted &&
        <Space size="middle">
          <a onClick={() => handleDelete(record._id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/patient-accounts`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      const tempData = result.map((item) => (
        {
          ...item,
          key: item._id
        }
      ))
      setData(tempData);
    }
    fetchApi();
  }, [])
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Patient Informations">
          <Table columns={columns} dataSource={data} />
        </ComponentCard>
      </div>
    </>
  )
}

export default PatientInfors;